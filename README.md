# Next.js + Supabase Starter
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Faloshy-ai%2Fstarter&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)

Next.js starter template with Supabase integration and one-click Vercel deployment.

## Features
- Next.js 14+ with App Router
- Supabase Authentication
- TypeScript
- Nix Development Environment
- One-click Vercel Deployment

## Prerequisites
### Install Nix
```bash
sh <(curl -L https://nixos.org/nix/install) --daemon
```

### Enable Flakes
```bash
echo "experimental-features = nix-command flakes" | mkdir -p ~/.config/nix && tee ~/.config/nix/nix.conf
```

## Development
1. Clone repository
```bash
git clone https://github.com/aloshy-ai/starter.git
cd starter
```

2. Enter development shell
```bash
nix develop
```

3. Install dependencies
```bash
yarn install
```

4. Start development server
```bash
yarn dev
```

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
MIT License - see [LICENSE](LICENSE) for details