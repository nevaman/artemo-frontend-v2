
import React, { useState, useMemo } from 'react';
import type { Tool, ToolCategory } from '../types.ts';
import { ToolCard } from './ToolCard.tsx';
import { ChevronDownIcon } from './Icons.tsx';
import { allCategories } from '../constants.ts';

interface AllToolsViewProps {
    tools: Tool[];
    onInitiateToolActivation: (tool: Tool) => void;
    showNoResults?: boolean;
    favoriteTools: string[];
    onToggleFavorite: (toolId: string) => void;
}

const CollapsibleCategory: React.FC<{
    category: ToolCategory;
    tools: Tool[];
    onInitiateToolActivation: (tool: Tool) => void;
    favoriteTools: string[];
    onToggleFavorite: (toolId: string) => void;
}> = ({ category, tools, onInitiateToolActivation, favoriteTools, onToggleFavorite }) => {
    const [isOpen, setIsOpen] = useState(true);
    const categoryName = category.replace(/_/g, ' ');

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-3 px-4 bg-light-bg-sidebar dark:bg-dark-bg-component rounded-md transition-colors hover:bg-light-border dark:hover:bg-dark-border/20"
            >
                <h3 className="font-serif text-xl font-bold text-light-text-primary dark:text-dark-text-primary">{categoryName}</h3>
                <ChevronDownIcon className={`w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tools.map(tool => (
                        <ToolCard
                            key={tool.id}
                            tool={tool}
                            onInitiateToolActivation={onInitiateToolActivation}
                            isFavorite={favoriteTools.includes(tool.id)}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};


export const AllToolsView: React.FC<AllToolsViewProps> = ({ tools, onInitiateToolActivation, showNoResults, favoriteTools, onToggleFavorite }) => {

    const groupedTools = useMemo(() => {
        const groups: { [key in ToolCategory]?: Tool[] } = {};
        for (const tool of tools) {
            if (!groups[tool.category]) {
                groups[tool.category] = [];
            }
            groups[tool.category]!.push(tool);
        }
        return groups;
    }, [tools]);
    
    const orderedCategories = allCategories.filter(cat => groupedTools[cat] && groupedTools[cat]!.length > 0);

    return (
        <div className="p-4 lg:p-6 max-w-5xl mx-auto w-full">
            <h2 className="font-serif text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">All Tools</h2>
            {showNoResults ? (
                 <div className="text-center py-12 text-light-text-tertiary dark:text-dark-text-tertiary">
                    <h3 className="text-lg font-semibold">No results found</h3>
                    <p>Try a different search term.</p>
                </div>
            ) : (
                <div>
                    {orderedCategories.map(category => (
                        <CollapsibleCategory
                            key={category}
                            category={category}
                            tools={groupedTools[category]!}
                            onInitiateToolActivation={onInitiateToolActivation}
                            favoriteTools={favoriteTools}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};