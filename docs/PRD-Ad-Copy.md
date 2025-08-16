
# PRD: Ad Copy Tools

**Category Owner:** Advertising Team
**Version:** 1.3
**Date:** 2025-20-08

---

## 1. Category Overview

**Name:** Ad Copy

**Purpose:** To provide a specialized set of tools for creating high-impact advertising copy across various platforms, including social media, search, and video. These tools leverage proven copywriting frameworks to maximize conversions.

## 2. Tools in this Category

- **Ad Writer (HAO):** Uses the Hook, Angle, Outcome framework.
- **Ad Writer (HSO):** Uses the Hook, Story, Offer framework.
- **YouTube Ad Script:** Generates scripts optimized for YouTube ads.

## 3. User Flow & Logic

1.  **Entry Point:** The user selects an Ad Copy tool from the Dashboard, "All Tools" page, or sidebar.
2.  **Activation Modal:** A large modal appears, showing the tool's info and a **"Start" button**.
3.  **Initiation:** The user clicks "Start" and is taken directly to the tool's chat interface.
4.  **Assistant Introduction:** The AI assistant sends its first message, introducing itself and its framework. For example, the HAO Ad Writer might say, "I'm ready to write some compelling ads using the Hook-Angle-Outcome framework. First, what product are we advertising?"
5.  **Core Loop:**
    - The assistant guides the user through the components of the selected framework (e.g., asking for details to create the Hook, then the Angle, then the Outcome).
    - **Project Association:** The user can assign the chat to a project at any time using the header dropdown.
    - The user provides information about the product, target audience, and key selling points.
    - **Knowledge Base:** The user can attach a file with brand guidelines or product details using the **"Knowledge Base"** feature.
    - The assistant generates multiple ad variations for the user to choose from.
    - The user can ask for revisions like "make the hook more controversial" or "give me a different angle."

## 4. General Prompt Structure & Examples

The user follows the scripted Q&A flow, providing information as the assistant requests it.

### Example Interaction (for Ad Writer HAO)

> **AI Assistant:** "I'm ready to write some compelling ads using the Hook-Angle-Outcome framework. First, what product are we advertising? Feel free to upload a product brief."
>
> **User:** "A new line of noise-canceling headphones for remote workers."
>
> **AI Assistant:** "Great. Who is our target audience?"
>
> **User:** "People who work from home and get distracted by family or roommates."
>
> **AI Assistant:** "Perfect. Let's start with the **Hook**. What is the single biggest frustration they face that these headphones solve?"
>
> **User:** "They can't focus during important meetings."
>
> **AI Assistant:** "Understood. Now for the **Angle**. What makes these headphones unique? Is it the comfort, battery life, or something else?"
>
> *(The conversation continues until the AI has all the details to generate the ad.)*
