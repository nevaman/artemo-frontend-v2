
# PRD: Long Form Content Tools

**Category Owner:** Content Strategy Team
**Version:** 1.3
**Date:** 2025-20-08

---

## 1. Category Overview

**Name:** Long Form Content

**Purpose:** To assist users in creating detailed, structured, and high-value long-form content such as blog posts, articles, and e-books. These tools are designed to handle the entire content creation process from outlining to writing full drafts.

## 2. Tools in this Category

- **Freestyle Long Form:** An open-ended generator for any topic.
- **Blog Post (How To):** Structures and writes a complete "how-to" style blog post.
- **Press Release:** Creates a professionally formatted press release.
- **Short Book Writer:** Guides the user through writing a short book or lead magnet.

## 3. User Flow & Logic

1.  **Entry Point:** The user selects a long-form tool from the application.
2.  **Activation Modal:** The app opens the tool's activation modal, and the user clicks **"Start"**.
3.  **Initiation:** The user clicks "Start" and is taken directly to the tool's chat interface.
4.  **Assistant Introduction:** The AI assistant starts its scripted conversation. For the "How To" Blog Post tool, it might ask, "I can help you write a great 'how-to' article. What is the main topic or task you want to teach your audience?"
5.  **Core Loop:**
    - The assistant asks a series of questions to gather details (topic, audience, key points, keywords, tone).
    - **Project Association:** The user can assign the chat to a project at any time using the header dropdown.
    - **Knowledge Base:** The user can attach research materials, notes, or a draft outline as a **"Knowledge Base"** file to inform the AI.
    - The AI will then generate a proposed outline for the user's approval.
    - The user can approve the outline or request changes.
    - Once the outline is approved, the AI proceeds to write the content, often section by section, allowing for feedback at each stage.

## 4. General Prompt Structure & Examples

The user's input is guided by the AI assistant's questions.

### Example Interaction (for "How To" Blog Post)

> **AI Assistant:** "I can help you write a great 'how-to' article. What is the main topic you want to teach your audience? Feel free to upload any research you've already done."
>
> **User:** "How to start a successful podcast in 2023." *(attaches a file with market stats)*
>
> **AI Assistant:** "Excellent topic and thank you for the data. Who is the target audience for this post? For example, are they beginners or experienced creators?"
>
> **User:** "Creative entrepreneurs with no technical experience."
>
> **AI Assistant:** "Understood. Based on that, here is a proposed outline for the blog post. Let me know if you'd like any changes before I start writing."
> *(Generates a 4-part outline)*
>
> **User:** "Looks good, let's go!"
> *(AI begins writing the article section by section)*
