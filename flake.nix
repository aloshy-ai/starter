{
  description = "A very basic flake";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = inputs:
    inputs.flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = (import (inputs.nixpkgs) { inherit system; });
      in {
        devShell = pkgs.mkShell {
          buildInputs=[
            pkgs.nodejs_20
            pkgs.yarn
            pkgs.typescript
            pkgs.docker
            pkgs.docker-compose
            pkgs.direnv
            pkgs.gh
            pkgs.deno
            pkgs.supabase-cli
            pkgs.nodePackages.vercel
          ];
        };
      }
    );
}
