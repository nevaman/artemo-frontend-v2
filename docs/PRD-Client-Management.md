
# PRD: Client Management Tools

**Category Owner:** Freelancer Tools Team
**Version:** 1.3
**Date:** 2025-20-08

---

## 1. Category Overview

**Name:** Client Management

**Purpose:** To equip freelance copywriters and agencies with tools to streamline administrative and client-facing tasks. These tools help manage client relationships, articulate value, and create professional documents, freeing up more time for creative work.

## 2. Tools in this Category

- **Client Interview Summarizer:** Creates concise summaries from call transcripts.
- **Contract Creator:** Generates simple, professional service contracts.
- **Copywriter Value Tool:** Helps articulate the value of copywriting services.
- **Freelance Bio Writer:** Crafts compelling professional bios for platforms like Upwork or LinkedIn.

## 3. User Flow & Logic

1.  **Entry Point:** The user selects a Client Management tool from the Dashboard, "All Tools" page, or the sidebar.
2.  **Activation Modal:** A large modal appears, showing the tool's info and a **"Start" button**.
3.  **Initiation:** The user clicks "Start" and is taken directly to the tool's chat interface.
4.  **Assistant Introduction:** The AI assistant sends its first message, introducing itself and beginning its scripted questioning. For example, the Contract Creator might ask, "To start drafting the contract, what is the full name of your client?"
5.  **Core Loop:**
    - The user provides the necessary information in response to the assistant's questions.
    - **Project Association:** At any point, the user can use the dropdown in the header to assign the chat to a project.
    - **Knowledge Base:** For documents like call transcripts or client briefs, the user can attach a file directly using the **"Knowledge Base"** feature in the chat input.
    - The assistant processes the input and generates the required document or text (e.g., a summarized meeting, a draft contract).
    - The user can request revisions or additions through follow-up chat messages.

## 4. General Prompt Structure & Examples

The initial prompt is handled by the scripted conversation. The user provides information piece by piece as requested by the assistant.

### Example Interaction (for Client Interview Summarizer)

> **AI Assistant:** "Hello, I'm here to help you summarize client interviews. Please upload the transcript file or paste the full text of the conversation into the chat."
>
> **User:** *(Clicks "Knowledge Base" and uploads `Transcript.txt`)*
>
> **AI Assistant:** "Thank you. I'm analyzing the transcript now. Are there any specific areas you want me to focus on, such as key challenges, budget, or timeline?"
>
> **User:** "Yes, please pull out their main business goals and the specific deliverables they mentioned."
>
> **AI Assistant:** "Understood. Here is a summary focusing on those key points..."
> *(Generates a structured summary)*
