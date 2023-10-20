## Synth AI Chat Bot

This is the SynthAI Chat Bot, base version. It is intended for use by SynthAI to quickly develop chatbots
and generators for clients. This is a RAG (Retrevial Augmented Generation) focused application. The intent is for users to be able to upload their data, and then query it to generate additional content in their style/tone.

**Current Status**
During development we had a request for this to be used as a generator for marketing copy. As such, the current prompt and layout is built for managing data related to copy, but will be changed to be more versatile as time goes on.

**Known Bugs**
- There is some async timing issues when this runs live on the Vercel server, in which it is unable to create a document to store information required for inspiration vectors to show up. Resolved in next push.

## Live Demo
https://synthai-base-bot.vercel.app
