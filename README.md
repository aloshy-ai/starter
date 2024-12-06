# Next.js + Supabase Starter

Next.js starter template with Supabase integration and one-click Vercel deployment.

## Features

- Next.js 14+ with App Router
- Supabase Authentication
- TypeScript
- Nix Development Environment
- One-click Vercel Deployment

## Prerequisites

### 1. Install Nix

```bash
sh <(curl -L https://nixos.org/nix/install) --daemon
```

### 2. Enable Flakes and Nix-Direnv

Add to your `~/.config/nix/nix.conf`:

```bash
experimental-features = nix-command flakes
```

### 3. Setup Direnv

Install direnv and nix-direnv:

```bash
nix-env -i direnv nix-direnv
```

Add to your shell RC file (~/.bashrc, ~/.zshrc, etc):

```bash
eval "$(direnv hook zsh)"  # or bash
source $HOME/.nix-profile/share/nix-direnv/direnvrc
```

### 4. Install Docker Desktop

Download and install from [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Development

### 1. Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Faloshy-ai%2Fquick-starter-nextjs-supabase.git&project-name=nextjs-supabase-quick-starter&repository-name=nextjs-supabase-quick-starter&demo-title=nextjs-supabase-quick-starter&demo-description=This%20starter%20configures%20a%20project%20to%20quickly%20deploy%20with%20Vercel&demo-url=https%3A%2F%2Fstarter.aloshy.ai&external-id=https%3A%2F%2Fgithub.com%2Faloshy-ai%2Fquick-starter-nextjs-supabase.git&demo-image=https%3A%2F%2Fstarter.aloshy.ai%2Fopengraph-image.png&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)

_Note the Password of the new Database created for future!_

### 1. Clone Repository

Then clone the repository just created, and navigate to the project directory:

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Setup Environment

```bash
direnv allow
```

The environment will automatically load when:

- Entering the directory in terminal
- Opening VS Code with the Direnv extension
- Opening terminals inside supported IDEs with direnv integration

If the environment doesn't load automatically:

```bash
direnv reload
```

Or if didn't work, you can manually load the environment:

```bash
nix develop
```

### 3. Install Dependencies

```bash
yarn install
```

### 4. Link Vercel, Supabase and GitHub CLI

#### a. Vercel

```bash
vercel link
```

#### b. Supabase

```bash
supabase login
supabase link
```

#### c. GitHub CLI

```bash
gh auth login
```

### 5. Environment Variables

Create a `.env.local` file in the root of the project and add the missing values:

```bash
cp .env.example .env.local
```

### 6. Setup Github Oauth Clients

- Go to `https://github.com/settings/developers and create 2 new OAuth Apps in your GitHub account - one for development and one for production.
- Update the `.env.local` file with the client ID and secret for development environment. 
- Go to https://supabase.com/dashboard/project/<PROJECT_ID>/auth/providers, and add the GitHub OAuth client ID and secret for production environment.


## Misc. Commands

Pull the environment variables from Vercel:

```bash
vercel env pull
vercel env pull .env.production --environment production
```

_Prodcution environment variable shall not display `Sensitive` values_

## Contributing

We follow the [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow):

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Maintenance tasks

## License

MIT License - see [LICENSE](./LICENSE) for details.
