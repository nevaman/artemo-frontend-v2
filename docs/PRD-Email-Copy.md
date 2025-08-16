
# PRD: Email Copy Tools

**Category Owner:** Email Marketing Team
**Version:** 1.3
**Date:** 2025-20-08

---

## 1. Category Overview

**Name:** Email Copy

**Purpose:** To offer a comprehensive suite of tools for crafting high-performing emails, from single promotional messages to complex automated sequences. These tools are designed to help users increase open rates, boost engagement, and drive conversions.

## 2. Tools in this Category

- **Money Tales Emails:** Turns simple stories into engaging, sales-driven emails.
- **Advanced Subject Line Writer:** Generates creative, high-open-rate subject lines.
- **Product Launch Email Sequence:** Generates a full 7-day promotional sequence.
- **Welcome Email Sequence:** Creates a 7-day onboarding sequence for new subscribers.

## 3. User Flow & Logic

1.  **Entry Point:** The user selects a specific email tool from anywhere in the app.
2.  **Activation Modal:** The app displays the tool's activation modal, and the user clicks **"Start"**.
3.  **Initiation:** After clicking "Start," the user is taken directly to the tool's chat interface.
4.  **Assistant Introduction:** The AI assistant begins its scripted flow. For the Product Launch Sequence tool, it might start with, "I'm excited to help you build your launch sequence! First, what is the name of the product you are launching?"
5.  **Core Loop:**
    - The assistant guides the user through a series of questions to gather all necessary details (product, audience, offer, tone, key points).
    - **Project Association:** The user can assign the chat to a project at any time using the header dropdown.
    - For sequence generators, the assistant will collect information for the entire series before generating the content.
    - The user can attach a **"Knowledge Base"** file containing product details or audience personas to provide deeper context.
    - The AI generates the requested email copy.
    - The user can request edits, such as "make the tone more casual" or "add a P.S. with a sense of urgency."

## 4. General Prompt Structure & Examples

The user provides information through a guided conversation, not a single large prompt.

### Example Interaction (for Product Launch Email Sequence)

> **AI Assistant:** "I'm excited to help you build your launch sequence! First, what is the name of the product you are launching?"
>
> **User:** "It's an online course called 'The Freelance Freedom Formula.'"
>
> **AI Assistant:** "Great name! Who is the target audience for this course? You can also upload a customer persona document if you have one."
>
> **User:** "Aspiring freelance writers who want to quit their 9-5 jobs."
>
> **AI Assistant:** "Perfect. And what is the special launch price for the course?"
>
> **User:** "$297"
>
> *(The conversation continues until the AI has all the details it needs, then it generates the full 7-day sequence.)*
