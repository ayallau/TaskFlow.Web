# Terminal Commands

# NPM

npm run dev

npm run build

npm run preview

npm run lint

# GIT

git add .

git commit -m "Your commit message"

git push origin main

# Fetch all branches
git fetch --all

# Remove a file from the repository but keep it locally
git rm --cached .vscode/settings.json

git log --oneline

git diff > changes.diff

git diff --staged

git diff --staged > .user_files(TaskFlow)/diff.patch

git log --oneline -10

# Show the changes made in a specific commit

git show <commit-hash>

git show --format= --no-ext-diff <commit-hash> > commit.diff

git format-patch -1 <commit-hash>
