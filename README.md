# PathPilot

**A personal career-planning frontend project.**

PathPilot started with a simple problem: career advice usually gives people too many things to learn at once. I wanted a small interface that helps answer the more useful question:

> **What should I work on next, and what could I build to prove it?**

## What it does

- Choose from 9 career directions.
- Select the skills you already have.
- Calculate a weighted readiness score.
- Highlight high-priority gaps.
- Compare your current skills against nearby career paths.
- Turn the gaps into a focused 4-week experiment.
- Mark weekly work complete.
- Recommend larger portfolio projects instead of tutorial clones.
- Generate a CV bullet from a project.
- Track a simple learning streak.
- Generate interview questions for project practice.
- Export a local career snapshot.
- Persist your progress with LocalStorage.
- Works without a backend.

## Why I designed it this way

I deliberately avoided making this another generic quiz website. The important part is the transition from **assessment → action → evidence**.

A score on its own is not very useful. The score should lead to a next skill, the skill should lead to a project, and the project should become something you can discuss in an interview.

## Tech

- HTML5
- CSS3
- Vanilla JavaScript
- SVG
- LocalStorage
- Responsive design

No framework is required, which keeps the project easy to understand and extend.

## Interesting frontend work

### Weighted scoring
Each skill has a different importance value for every role. Readiness is calculated from the selected skills rather than treating every checkbox equally.

### Transferable career comparison
The same skill array is tested against other roles so the UI can show how a person's current abilities transfer.

### Persistent state
Career, selected skills, completed weeks, theme and streak are stored locally, so refreshing the page does not reset the experience.

### Product-oriented project suggestions
Projects are mapped to skills and are written as real product problems rather than “build a calculator” style exercises.

## Run

Open the folder in VS Code and use Live Server, or open `index.html` directly in a modern browser.

## GitHub Pages

Because this is a static site, it can be deployed through GitHub Pages from the repository's main branch/root.

## CV description

**PathPilot — Career Planning Web App:** Designed and built a responsive career-planning application that uses weighted skill scoring, transferable-career comparison, persistent learning progress and project recommendations to turn career exploration into a practical 30-day plan.

## Ideas for version 3

- GitHub profile import and repository skill detection
- Real job-posting skill trends
- PWA/offline installation
- Firebase/Supabase accounts
- Accessibility automated checks
- Unit and end-to-end tests
- Personal analytics dashboard
- Import/export of profile JSON
