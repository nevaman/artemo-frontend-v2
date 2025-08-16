
import React, { useState, useRef, useEffect } from 'react';
import type { Tool } from '../types.ts';
import { allTools, featuredToolIds } from '../constants.ts';
import { ToolCard } from './ToolCard.tsx';
import { SendIcon, XIcon } from './Icons.tsx';

interface DashboardViewProps {
    onInitiateToolActivation: (tool: Tool) => void;
    favoriteTools: string[];
    onToggleFavorite: (toolId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onInitiateToolActivation, favoriteTools, onToggleFavorite }) => {
    const [prompt, setPrompt] = useState('persuasive email for a new product launch');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [prompt]);

    const featuredTools = featuredToolIds.map(id => allTools.find(t => t.id === id)).filter(Boolean) as Tool[];

    return (
        <>
            <div className="flex flex-col h-full">
                {/* Hero Section */}
                <section className="relative flex flex-col items-center justify-center flex-grow p-6 bg-light-bg-sidebar dark:bg-dark-bg-page min-h-[70vh]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,179,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,179,0.08),transparent_70%)]"></div>
                    <div className="relative w-full max-w-4xl text-center">
                        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">What do you want to create today?</h1>
                        <div className="flex items-start text-left bg-light-bg-component dark:bg-black/20 border border-light-border dark:border-white/20 rounded-md p-1 pl-4 shadow-lg">
                            <span className="text-lg text-primary-accent whitespace-nowrap font-medium pt-3 flex-shrink-0">I want to create a&nbsp;</span>
                            <textarea
                                ref={textareaRef}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                rows={1}
                                className="prompt-input flex-grow border-none outline-none bg-transparent p-3 text-lg text-light-text-primary dark:text-dark-text-primary font-medium resize-none leading-normal max-h-60"
                            />
                            <button className="bg-primary-accent text-text-on-accent border-none rounded-sm m-1 p-2.5 cursor-pointer flex items-center justify-center transition-opacity self-end flex-shrink-0 hover:opacity-85">
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </div>
                         <p className="mt-4 text-sm text-light-text-tertiary dark:text-dark-text-tertiary max-w-2xl mx-auto">
                            <span className="font-semibold">Tip:</span> The more details you provide, the better the result. For example: <span className="italic">"a witty tweet about the challenges of remote work"</span>
                        </p>
                    </div>
                </section>

                {/* Content Below Hero */}
                <div className="p-4 lg:p-6 pb-8 bg-light-bg-page dark:bg-dark-bg-page">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-serif text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-5">Featured Tools</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {featuredTools.map(tool => (
                                <ToolCard key={tool.id} tool={tool} onInitiateToolActivation={onInitiateToolActivation} isFavorite={favoriteTools.includes(tool.id)} onToggleFavorite={onToggleFavorite} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <InfoBanner />
        </>
    );
};

const InfoBanner: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    useEffect(() => {
        try {
            const dismissed = localStorage.getItem('infoBannerDismissed');
            if (!dismissed) {
                const timer = setTimeout(() => {
                    setIsOpen(true);
                    setIsMounted(true);
                }, 500);
                return () => clearTimeout(timer);
            }
        } catch (error) {
            console.error("Could not access localStorage", error);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        if (dontShowAgain) {
            try {
                localStorage.setItem('infoBannerDismissed', 'true');
            } catch (error) {
                console.error("Could not access localStorage", error);
            }
        }
    };

    if (!isMounted) return null;

    return (
        <>
            <div className={`fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[1000] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={handleClose}></div>
            <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-light-bg-component dark:bg-dark-bg-component border-l border-light-border dark:border-dark-border shadow-2xl z-[1001] p-6 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-serif text-xl font-bold text-light-text-primary dark:text-dark-text-primary">Getting Started</h4>
                    <button onClick={handleClose} className="p-1 rounded-full text-light-text-tertiary dark:text-dark-text-tertiary hover:bg-black/10 dark:hover:bg-white/10">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto -mr-3 pr-5 space-y-3 text-base text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                    <p>Read the <a href="#" className="text-primary-accent font-medium hover:underline">Artemo User Guide</a>. It's updated frequently, so check it often.</p>
                    <p>Use our tools to create amazing copy for your business or clients. Find all tools in the left-hand navigation bar or in the All Tools section below.</p>
                    <p>Join our <a href="#" className="text-primary-accent font-medium hover:underline">community</a> to discuss and get help from hundreds of Artemo users who are making money and growing their businesses daily.</p>
                    <div>
                        <h5 className="font-semibold text-light-text-primary dark:text-dark-text-primary mt-4 mb-2 uppercase tracking-wider text-sm">IMPORTANT NOTICE</h5>
                        <p>For questions, contact support at <a href="mailto:hello@artemo.ai" className="text-primary-accent font-medium hover:underline">hello@artemo.ai</a>.</p>
                    </div>
                </div>
                <div className="flex-shrink-0 pt-6 border-t border-light-border dark:border-dark-border">
                     <label className="flex items-center gap-3 cursor-pointer text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        <input 
                            type="checkbox" 
                            checked={dontShowAgain}
                            onChange={(e) => setDontShowAgain(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 dark:bg-dark-bg-component text-primary-accent focus:ring-primary-accent"
                        />
                        Don't show this again
                    </label>
                </div>
            </div>
        </>
    );
};