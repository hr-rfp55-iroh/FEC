# Contribution Guidelines
## Git workflow

### General Rules

- Never work directly on the main branch
- Create a branch for each new feature
- Handle merge conflicts on local clone in VS Code
- Pull requests must be reviewed by another team member before closing
- If any changes are accidentally made on main:
  1. Stash changes: git stash
  2. Check out into the new branch: git checkout -b <feature_name>
  3. Apply those changes to the new branch: git stash pop

### Getting Started

First, run the development server:

```bash
npm start
```

Open [http://localhost:3004](http://localhost:3004) with your browser to see the result.

Creating a new Feature Branch
Clone from this repo

```bash
git clone https://github.com/HRRFP55-IROH/FEC.git
```
Make sure you are on branch main with latest version

Create a branch with a name descriptive of the feature you are developing

Make changes, commit frequently

Push to feature-branch on GitHub

git checkout main
git pull
git checkout -b feature-name
# do work, commit often
git push origin feature-name
# submit Pull Request
Adding Features from Branches to main
Submit Pull Request
base main <- feature-name
reference Trello ticket with link
Have a team member complete a Code Review according to Code Review Guidlines
reviewer will check to ensure code meets standards
Syncing changes with main
Avoid conflicts in PR

Switch to branch main locally

Pull changes made to main by others

Switch to feature-branch

Merge changes from main -> feature-branch

Handle any merge conflicts in VS Code

Push up to GitHub feature-branch

git checkout main
git pull
git checkout feature-branch
git merge main
# handle merge conflicts
git push origin feature-branch
Pulling Features for Testing
create new branch locally branched from main
checkout new branch
pull from origin feature-branch
git checkout main
git pull
git checkout -b feature-branch
git pull origin feature-branch