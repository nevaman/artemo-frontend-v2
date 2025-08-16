
import React from 'react';
import type { View, Tool, ChatHistoryItem, Project } from '../types.ts';
import { allTools } from '../constants.ts';
import { DashboardView } from './DashboardView.tsx';
import { ToolGridView } from './ToolGridView.tsx';
import { AllToolsView } from './AllToolsView.tsx';
import { AllProjectsView } from './AllProjectsView.tsx';
import { ToolInterfaceView } from './ToolInterfaceView.tsx';
import { ArtemoFullLogo, MenuIcon, MoonIcon, SunIcon, HelpCircleIcon } from './Icons.tsx';

interface MainContentProps {
    currentView: View;
    selectedTool: Tool | null;
    onInitiateToolActivation: (tool: Tool) => void;
    onNavigate: (view: View) => void;
    onToggleTheme: () => void;
    theme: 'light' | 'dark';
    onToggleSidebar: () => void;
    searchTerm: string;
    favoriteTools: string[];
    onToggleFavorite: (toolId: string) => void;
    onSaveChat: (chat: Omit<ChatHistoryItem, 'id'>) => void;
    projects: Project[];
    onNewProject: () => void;
    onOpenRenameModal: (item: { id: string; name: string; type: 'project' | 'chat' }) => void;
    onDeleteProject: (projectId: string) => void;
}

export const MainContent: React.FC<MainContentProps> = ({
    currentView,
    selectedTool,
    onInitiateToolActivation,
    onNavigate,
    onToggleTheme,
    theme,
    onToggleSidebar,
    searchTerm,
    favoriteTools,
    onToggleFavorite,
    onSaveChat,
    projects,
    onNewProject,
    onOpenRenameModal,
    onDeleteProject,
}) => {
    const renderView = () => {
        if (currentView === 'tool-interface-view' && selectedTool) {
            return <ToolInterfaceView tool={selectedTool} onBack={() => onNavigate('dashboard-view')} onSaveChat={onSaveChat} projects={projects} onNewProject={onNewProject} />;
        }
        
        const normalizedSearch = searchTerm.toLowerCase().trim();
        const filteredTools = allTools.filter(tool => 
            tool.title.toLowerCase().includes(normalizedSearch) || 
            tool.category.replace(/_/g, ' ').toLowerCase().includes(normalizedSearch)
        );

        const toolGridProps = { onInitiateToolActivation, favoriteTools, onToggleFavorite };

        switch (currentView) {
            case 'dashboard-view':
                return <DashboardView {...toolGridProps} />;
            case 'all-tools-view':
                return <AllToolsView tools={filteredTools} showNoResults={searchTerm.length > 0 && filteredTools.length === 0} {...toolGridProps} />;
            case 'all-projects-view':
                return <AllProjectsView projects={projects} onNewProject={onNewProject} onOpenRenameModal={onOpenRenameModal} onDeleteProject={onDeleteProject} />;
            case 'history-view':
                return <div className="p-4 lg:p-6"><h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">History</h2><p>Your recent activity will appear here.</p></div>;
            case 'client-management-view':
                return <ToolGridView title="Client Management Tools" tools={allTools.filter(t => t.category === 'CLIENT_MANAGEMENT')} {...toolGridProps} />;
            case 'copy-improvement-view':
                return <ToolGridView title="Copy Improvement Tools" tools={allTools.filter(t => t.category === 'COPY_IMPROVEMENT')} {...toolGridProps} />;
            case 'ad-copy-view':
                return <ToolGridView title="Ad Copy Tools" tools={allTools.filter(t => t.category === 'AD_COPY')} {...toolGridProps} />;
            case 'email-copy-view':
                return <ToolGridView title="Email Copy Tools" tools={allTools.filter(t => t.category === 'EMAIL_COPY')} {...toolGridProps} />;
            case 'long-form-view':
                return <ToolGridView title="Long Form Content Tools" tools={allTools.filter(t => t.category === 'LONG_FORM')} {...toolGridProps} />;
            case 'podcast-tools-view':
                return <ToolGridView title="Podcast Tools" tools={allTools.filter(t => t.category === 'PODCAST_TOOLS')} {...toolGridProps} />;
            case 'sales-funnel-copy-view':
                return <ToolGridView title="Sales & Funnel Copy Tools" tools={allTools.filter(t => t.category === 'SALES_FUNNEL_COPY')} {...toolGridProps} />;
            case 'other-flows-view':
                return <ToolGridView title="Other Tools" tools={allTools.filter(t => t.category === 'OTHER_FLOWS')} {...toolGridProps} />;
            default:
                return <DashboardView {...toolGridProps} />;
        }
    };

    return (
        <main className="flex-grow flex flex-col bg-light-bg-page dark:bg-dark-bg-page">
            <MobileHeader onToggleSidebar={onToggleSidebar} onToggleTheme={onToggleTheme} theme={theme} />
            <MainTopBar onToggleTheme={onToggleTheme} theme={theme} />
            <div className="flex-grow overflow-y-auto">
                {renderView()}
            </div>
        </main>
    );
};

const MobileHeader: React.FC<Pick<MainContentProps, 'onToggleSidebar' | 'onToggleTheme' | 'theme'>> = ({ onToggleSidebar, onToggleTheme, theme }) => (
    <header className="lg:hidden flex items-center justify-between p-3 border-b border-light-border dark:border-dark-border bg-light-bg-page dark:bg-dark-bg-page">
        <button onClick={onToggleSidebar} className="p-1">
            <MenuIcon className="w-6 h-6 text-light-text-primary dark:text-dark-text-primary" />
        </button>
        <a href="#" className="flex items-center">
            <ArtemoFullLogo className="h-8" />
        </a>
        <ThemeToggleButton onToggleTheme={onToggleTheme} theme={theme} />
    </header>
);

const MainTopBar: React.FC<Pick<MainContentProps, 'onToggleTheme' | 'theme'>> = ({ onToggleTheme, theme }) => (
    <header className="hidden lg:flex justify-end items-center py-3 px-6 border-b border-light-border dark:border-dark-border flex-shrink-0">
        <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 p-1 rounded-sm text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-sidebar dark:hover:bg-dark-bg-component hover:text-light-text-primary dark:hover:text-dark-text-primary font-medium">
                <HelpCircleIcon className="w-5 h-5" />
                <span>Help center</span>
            </button>
            <ThemeToggleButton onToggleTheme={onToggleTheme} theme={theme} />
        </div>
    </header>
);

const ThemeToggleButton: React.FC<{onToggleTheme: () => void; theme: 'light' | 'dark'}> = ({onToggleTheme, theme}) => (
     <button onClick={onToggleTheme} className="p-1 rounded-sm text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-sidebar dark:hover:bg-dark-bg-component hover:text-light-text-primary dark:hover:text-dark-text-primary">
        {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
    </button>
);