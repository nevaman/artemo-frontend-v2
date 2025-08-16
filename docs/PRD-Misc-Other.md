
# PRD: Other Tools

**Category Owner:** Product Innovation Team
**Version:** 1.3
**Date:** 2025-20-08

---

## 1. Category Overview

**Name:** Other

**Purpose:** To house a variety of specialized tools that don't fit into the main content categories but provide significant value for writers and marketers. This category includes tools for audience research, website copy, and sales support.

## 2. Tools in this Category

- **Audience Analyzer:** Helps identify an audience's worries, fears, wants, and needs.
- **Website Copy Tool:** Generates copy for core website pages (About, Contact, Services).
- **Sales Assistant:** Provides effective responses to common sales objections.

## 3. User Flow & Logic

1.  **Entry Point:** The user selects a tool from the "Other" category.
2.  **Activation Modal:** The application opens the tool's immersive modal, and the user clicks **"Start"**.
3.  **Initiation:** The user clicks "Start" and is taken directly to the tool's chat interface.
4.  **Assistant Introduction:** The AI assistant begins its scripted conversation. For the Audience Analyzer, it might ask, "I can help you understand your audience better. To start, please describe the product or service you are offering."
5.  **Core Loop:**
    - The assistant asks for the context-specific information required by the tool.
    - **Project Association:** The user can assign the chat to a project at any time using the header dropdown.
    - The user responds to the questions.
    - **Knowledge Base:** The user can upload customer research, survey data, or product briefs using the **"Knowledge Base"** feature to give the AI more context.
    - The AI generates a specialized output, such as a detailed audience persona, a full page of website copy, or a list of objection-handling scripts.
    - The user can refine the output with follow-up questions.

## 4. General Prompt Structure & Examples

The user follows the scripted Q&A flow provided by the AI assistant.

### Example Interaction (for Audience Analyzer)

> **AI Assistant:** "I can help you understand your audience on a deeper level. To start, please describe the product or service you are offering. You can also upload any existing audience research."
>
> **User:** "It's a productivity app called 'Zenith' that helps remote workers manage tasks and avoid burnout." *(Attaches 'Survey_Results.pdf')*
>
> **AI Assistant:** "Thank you for the survey data. Now, can you describe your ideal user in one sentence?"
>
> **User:** "A 35-year-old project manager who feels overwhelmed by constant notifications and struggles with work-life balance."
>
> **AI Assistant:** "Thank you. Based on that profile and your attached research, here is an analysis of your target audience's wants, fears, and needs..."
> *(Generates a structured analysis)*
