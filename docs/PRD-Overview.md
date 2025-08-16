# Product Requirements Document: Artemo AI Dashboard

**Author:** Artemo AI Development Team
**Version:** 1.5
**Date:** 2025-22-08

---

## 1. Overview

The Artemo AI Dashboard is a powerful, web-based application designed for copywriters, marketers, and content creators. It provides a suite of specialized AI-powered tools to streamline the process of generating high-quality, effective copy for various business needs. Each tool functions as a custom-tuned AI assistant with a unique persona and a scripted, logic-based conversation flow.

## 2. Project Goals

- **Increase Efficiency:** Dramatically reduce the time and effort required to produce high-quality written content.
- **Improve Quality:** Provide users with AI tools that generate creative, persuasive, and on-brand copy.
- **Streamline Workflow:** Offer a centralized, project-based dashboard for managing content creation.
- **Enhance User Experience:** Deliver a beautiful, accessible, and fatigue-free user interface.

## 3. Target Audience

Professional copywriters, freelance writers, digital marketers, and small business owners, typically between the ages of 30 and 45. These users value efficiency, quality, and an intuitive, aesthetically pleasing work environment.

## 4. Core Features & Logic

### 4.1. Recommendation Engine (Dashboard)

The dashboard's primary function is to guide the user to the right tool quickly.
- **User Input:** A central prompt asks the user, "What do you want to create today?". The user can type a freeform goal (e.g., "I want to write an email funnel for a course launch").
- **AI-Powered Suggestions:** The system will use an LLM (e.g., Gemini) to analyze the user's input and suggest the most relevant tools from the Artemo library (e.g., "Product Launch Email Sequence," "Advanced Subject Line Writer").
- **Direct Access:** The user can click on a suggested tool to start a new chat session.

### 4.2. Tool Activation Flow

The process of starting a tool is standardized to ensure a consistent and focused user experience.
1.  **Selection:** The user selects a tool from the dashboard, search results, or the "All Tools" page.
2.  **Immersive Modal:** A large, screen-centered modal appears, blurring the background to draw focus. This modal displays the tool's icon, name, description, and a prominent **"Start" button**. It also includes a "Don't show this again" option for convenience.
3.  **Initiation:** The user clicks the "Start" button to launch the assistant.
4.  **Assistant Introduction:** The user is taken directly to the tool's chat interface, where the predefined AI assistant sends its first message, introducing itself and starting its scripted conversation flow (e.g., "Hi, I'm the Ad Copy assistant. To get started, please tell me about the product you're advertising.").

### 4.3. Tool as a Custom Chatbot

Each tool is a custom AI assistant, not just a simple prompt wrapper.
- **Persona:** Every tool has a predefined role and persona (e.g., "You are an expert direct response copywriter"). This is set in the backend via a system prompt.
- **Scripted Flow:** Each assistant follows a scripted sequence of questions to gather the necessary information from the user. Conditional logic can be applied (e.g., if the user mentions a video ad, the assistant asks about the desired video length).
- **Knowledge Base Attachments:** The chat interface includes a "Knowledge Base" button, allowing users to upload a file (e.g., .txt, .pdf, .docx) with their message. This is crucial for providing context like product briefs, research, or call transcripts.
- **Model Assignment:** The underlying LLM (e.g., `gemini-2.5-flash`) is assigned to each tool by an administrator in the backend. **The user never selects the model.**

#### 4.3.1. Chat Interface UI/UX
To ensure readability and ease of use, the chat interface incorporates the following design principles:
- **Enhanced Readability:** AI responses are rendered in the "Merriweather" serif font with an increased font size and generous line spacing to reduce eye strain and improve comprehension, especially for long-form content.
- **Accessible Actions:** A "Copy" button is always visible directly below each AI-generated message bubble, allowing users to quickly and easily copy the full text of a response without needing to hover or select text manually.

### 4.4. Project and Chat Management

- **Projects as Folders:** Projects are the primary method of organization. They act as folders to group related chat sessions. Projects can be created, renamed, and deleted from the sidebar or the dedicated "All Projects" page.
- **"All Projects" View:** A dedicated page, accessible from the sidebar, displays all user-created projects in a card layout, serving as a central hub for project management.
- **Chat Association:** Every chat session can be associated with a project. A dropdown menu in the chat interface header allows the user to assign or change the project for the current chat at any time.
- **Chat History & Management:**
  - Users can view their recent chat history in the sidebar.
  - Each chat session in the history can be **renamed or deleted by the user** for better organization.
  - Users can reopen any chat to view previous responses and **continue the conversation**.