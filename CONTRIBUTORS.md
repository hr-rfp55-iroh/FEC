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

### Creating a new Feature Branch
1. Clone from this repo

```bash
git clone https://github.com/HRRFP55-IROH/FEC.git
```
2. Make sure you are on branch main with latest version

3. Create a branch with a name descriptive of the feature you are developing

4. Make changes, commit frequently

5. Push to feature-branch on GitHub

````bash
git checkout main
git pull
git checkout -b feature-name
# do work, commit often
git push origin feature-name
# submit Pull Request
````

### Adding Features from Branches to `main`
1. Submit Pull Request
    1. base main <- feature-name
    2. reference Trello ticket with link
2. Have a team member complete a Code Review according to Code Review Guidlines
    1. reviewer will check to ensure code meets standards

### Syncing changes with `main`
Avoid conflicts in PR

1. Switch to branch main locally

2. Pull changes made to main by others

3. Switch to feature-branch

4. Merge changes from main -> feature-branch

5. Handle any merge conflicts in VS Code

6. Push up to GitHub feature-branch

````bash
git checkout main
git pull
git checkout feature-branch
git merge main
# handle merge conflicts
git push origin feature-branch
````

### Pulling Features for Testing
1. create new branch locally branched from main
2. checkout new branch
3. pull from origin feature-branch

````bash
git checkout main
git pull
git checkout -b feature-branch
git pull origin feature-branch
````