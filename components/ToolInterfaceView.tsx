
import React, { useState, useRef, useEffect } from 'react';
import type { Tool, Message, ChatHistoryItem, Project } from '../types.ts';
import { toolScripts } from '../constants.ts';
import * as Icons from './Icons.tsx';
import { ChatMessage } from './ChatMessage.tsx';

interface ToolInterfaceViewProps {
    tool: Tool;
    onBack: () => void;
    onSaveChat: (chat: Omit<ChatHistoryItem, 'id'>) => void;
    projects: Project[];
    onNewProject: () => void;
}

const ProjectSelector: React.FC<{
    projects: Project[];
    selectedProjectId: string | null;
    onSelectProject: (id: string) => void;
    onNewProject: () => void;
}> = ({ projects, selectedProjectId, onSelectProject, onNewProject }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedProject = projects.find(p => p.id === selectedProjectId);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (id: string) => {
        onSelectProject(id);
        setIsOpen(false);
    };

    const handleNewProject = () => {
        onNewProject();
        setIsOpen(false);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md border border-light-border dark:border-dark-border bg-light-bg-component dark:bg-dark-bg-component text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-sidebar dark:hover:bg-dark-bg-page"
            >
                <Icons.FolderIcon className="w-4 h-4" />
                <span className="truncate max-w-[150px]">{selectedProject?.name || 'Add chat to project'}</span>
                <Icons.ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-light-bg-component dark:bg-dark-bg-component border border-light-border dark:border-dark-border rounded-md shadow-lg z-20">
                    <div className="p-2 max-h-60 overflow-y-auto">
                        {projects.map(project => (
                            <a
                                href="#"
                                key={project.id}
                                onClick={(e) => { e.preventDefault(); handleSelect(project.id); }}
                                className={`flex items-center gap-3 w-full text-left px-3 py-2 text-sm rounded-sm ${selectedProjectId === project.id ? 'bg-primary-accent/20 text-light-text-primary dark:text-dark-text-primary' : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-sidebar dark:hover:bg-dark-bg-page'}`}
                            >
                                <Icons.FolderIcon className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{project.name}</span>
                                {selectedProjectId === project.id && <Icons.CheckIcon className="w-4 h-4 ml-auto text-primary-accent" />}
                            </a>
                        ))}
                    </div>
                    <div className="p-2 border-t border-light-border dark:border-dark-border">
                         <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleNewProject(); }}
                            className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm rounded-sm text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-sidebar dark:hover:bg-dark-bg-page"
                        >
                            <Icons.PlusIcon className="w-4 h-4" />
                            <span>Create new project</span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export const ToolInterfaceView: React.FC<ToolInterfaceViewProps> = ({ tool, onBack, onSaveChat, projects, onNewProject }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(0); // 0 = initial, 1...n = questions, n+1 = finished
    const [isThinking, setIsThinking] = useState(false);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [currentProjectId, setCurrentProjectId] = useState<string | null>(projects[0]?.id || null);
    
    const script = toolScripts[tool.id] || toolScripts.default;

    useEffect(() => {
        setMessages([]);
        setAnswers([]);
        setCurrentStep(0);
        setIsThinking(true);
        setAttachedFile(null);
        
        setTimeout(() => {
            setMessages([{
                id: 'init-message',
                sender: 'ai',
                text: script.initialMessage
            }]);
            setCurrentStep(1);
            setIsThinking(false);
        }, 1000);
    }, [tool.id, script]);

    useEffect(() => {
        return () => {
            if (messages.length > 1) {
                onSaveChat({
                    toolId: tool.id,
                    toolTitle: tool.title,
                    messages,
                    timestamp: Date.now(),
                    projectId: currentProjectId,
                });
            }
        };
    }, [messages, tool, onSaveChat, currentProjectId]);

    const handleSendMessage = (text: string) => {
        if (currentStep > script.questions.length) return;

        const userMessage: Message = { 
            id: Date.now().toString(), 
            sender: 'user', 
            text,
            file: attachedFile ? { name: attachedFile.name, size: attachedFile.size } : undefined
        };
        setMessages(prev => [...prev, userMessage]);
        setAttachedFile(null);
        
        const newAnswers = [...answers, text];
        setAnswers(newAnswers);

        setIsThinking(true);
        setTimeout(() => {
            if (currentStep <= script.questions.length) {
                const nextQuestion = script.questions[currentStep - 1];
                const aiQuestion: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: nextQuestion };
                setMessages(prev => [...prev, aiQuestion]);
                setCurrentStep(prev => prev + 1);
            }
            
            if (currentStep === script.questions.length) {
                const finalResponseText = script.finalResponseGenerator(tool.title, newAnswers);
                const finalAiResponse: Message = { id: (Date.now() + 2).toString(), sender: 'ai', text: finalResponseText };
                setMessages(prev => [...prev, finalAiResponse]);
                setCurrentStep(prev => prev + 1);
            }
            setIsThinking(false);
        }, 1200);
    };

    return (
        <div className="h-full flex flex-col bg-light-bg-page dark:bg-dark-bg-page">
             <header className="flex-shrink-0 grid grid-cols-3 items-center gap-4 p-4 border-b border-light-border dark:border-dark-border sticky top-0 bg-light-bg-page/80 dark:bg-dark-bg-page/80 backdrop-blur-sm z-10">
                <div className="justify-self-start flex items-center gap-4">
                    <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary">
                        <Icons.ArrowLeftIcon className="w-4 h-4" />
                        Back
                    </button>
                    <div className="h-6 w-px bg-light-border dark:bg-dark-border"></div>
                    <ProjectSelector
                        projects={projects}
                        selectedProjectId={currentProjectId}
                        onSelectProject={setCurrentProjectId}
                        onNewProject={onNewProject}
                    />
                </div>
                <div className="justify-self-center">
                    <h2 className="font-serif text-xl font-bold text-light-text-primary dark:text-dark-text-primary truncate">{tool.title}</h2>
                </div>
                <div className="justify-self-end"></div> {/* Spacer for centering */}
            </header>

            <div className="flex-grow overflow-y-auto">
                <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-4">
                    {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                    {isThinking && <ThinkingIndicator />}
                </div>
            </div>

            <div className="flex-shrink-0 p-4 bg-light-bg-page dark:bg-dark-bg-page">
                <div className="max-w-3xl mx-auto">
                     <p className="text-center text-sm text-light-text-tertiary dark:text-dark-text-tertiary mb-2">
                        Click the <Icons.PaperclipIcon className="w-3.5 h-3.5 inline-block mx-0.5" /> icon to add a Knowledge Base file to your prompt.
                    </p>
                    <ChatInput 
                        onSendMessage={handleSendMessage} 
                        disabled={isThinking || currentStep > script.questions.length}
                        attachedFile={attachedFile}
                        setAttachedFile={setAttachedFile}
                    />
                </div>
            </div>
        </div>
    );
};

const ChatInput: React.FC<{
    onSendMessage: (text: string) => void;
    disabled: boolean;
    attachedFile: File | null;
    setAttachedFile: (file: File | null) => void;
}> = ({ onSendMessage, disabled, attachedFile, setAttachedFile }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setAttachedFile(event.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if ((text.trim() || attachedFile) && !disabled) {
            onSendMessage(text.trim());
            setText('');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="relative">
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <div className="flex flex-col text-left bg-light-bg-component dark:bg-dark-bg-component border border-light-border dark:border-dark-border rounded-lg p-2 shadow-sm dark:shadow-2xl">
                 <div className="flex items-end">
                    <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 mr-2"
                        title="Attach Knowledge Base file"
                    >
                       <Icons.PaperclipIcon className="w-5 h-5 text-light-text-tertiary dark:text-dark-text-tertiary" />
                    </button>
                    <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        rows={1}
                        placeholder={disabled ? "Waiting for response..." : "Type your message here..."}
                        className="prompt-input w-full border-none outline-none bg-transparent p-2 text-base text-light-text-primary dark:text-dark-text-primary font-medium resize-none leading-normal max-h-48 overflow-y-auto"
                        disabled={disabled}
                    />
                    <button type="submit" className="bg-primary-accent text-text-on-accent border-none rounded-md p-3 cursor-pointer flex items-center justify-center transition-opacity self-end flex-shrink-0 hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed" disabled={(!text.trim() && !attachedFile) || disabled}>
                        <Icons.SendIcon className="w-5 h-5" />
                    </button>
                </div>
                 {attachedFile && (
                    <div className="flex items-center gap-2 p-2 mt-2 ml-12 border-t border-light-border dark:border-dark-border">
                        <Icons.FileTextIcon className="w-4 h-4 text-light-text-tertiary"/>
                        <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{attachedFile.name}</span>
                        <button type="button" onClick={() => setAttachedFile(null)} className="ml-auto p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                            <Icons.XIcon className="w-4 h-4 text-light-text-tertiary"/>
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};

const ThinkingIndicator = () => (
    <div className="flex items-start gap-3">
        <Icons.ArtemoIcon className="w-8 h-8 flex-shrink-0" />
        <div className="p-3 rounded-lg bg-light-bg-component dark:bg-dark-bg-component flex items-center space-x-1.5 mt-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
    </div>
);