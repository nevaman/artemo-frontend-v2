
# PRD: Podcast Tools

**Category Owner:** Creator Tools Team
**Version:** 1.3
**Date:** 2025-20-08

---

## 1. Category Overview

**Name:** Podcast Tools

**Purpose:** To provide podcasters and their teams with a set of tools to streamline the marketing and administrative tasks associated with producing a podcast. These tools help with promotion, guest outreach, and content repurposing.

## 2. Tools in this Category

- **Podcast Email Announcement Tool:** Creates engaging emails to announce new episodes.
- **Podcast Media Sheet Generator:** Generates a professional one-page media sheet for guest booking.
- **Podcast Outreach Email:** Crafts personalized emails to pitch guests.
- **Podcast Shownotes Writer:** Generates comprehensive show notes from a transcript or summary.

## 3. User Flow & Logic

1.  **Entry Point:** The user selects a podcast-related tool.
2.  **Activation Modal:** The app opens the tool's activation modal, and the user clicks **"Start"**.
3.  **Initiation:** The user clicks "Start" and is taken directly to the tool's chat interface.
4.  **Assistant Introduction:** The AI assistant starts the conversation with a scripted question. For the Shownotes Writer, it would say, "I'm ready to write your show notes. Please upload the episode transcript or paste the text directly into the chat."
5.  **Core Loop:**
    - The user provides the necessary information as prompted by the assistant.
    - **Project Association:** The user can assign the chat to a project at any time using the header dropdown.
    - **Knowledge Base:** For transcript-based tools, the user must attach the audio transcript as a **"Knowledge Base"** file for the tool to function correctly.
    - The assistant may ask for clarifying details (e.g., "What is the official title of this episode?").
    - The AI generates the requested content, such as a formatted email, a media sheet, or a set of show notes with timestamps.
    - The user can request edits or different versions.

## 4. General Prompt Structure & Examples

The user provides information in a conversational manner, guided by the AI.

### Example Interaction (for Podcast Shownotes Writer)

> **AI Assistant:** "I'm ready to write your show notes. Please use the 'Knowledge Base' button to upload the episode transcript."
>
> **User:** *(Clicks "Knowledge Base" and uploads `Episode_42_Transcript.txt`)*
>
> **AI Assistant:** "Got it. What is the official title of this episode and who was the guest?"
>
> **User:** "The title is 'The Art of Focus' and the guest was Dr. Jane Evans, a neuroscientist."
>
> **AI Assistant:** "Perfect. I will now generate a summary, key takeaways, and a list of any resources mentioned in the transcript. One moment..."
> *(Generates a complete set of show notes)*
