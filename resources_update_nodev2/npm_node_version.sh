# Get NPM version by Node Version
curl -s "https://nodejs.org/dist/index.json" | jq -r ".[] | select(.version == \"v18.20.0\") | .npm"


# bash resources_update_nodev2/npm_node_version.sh