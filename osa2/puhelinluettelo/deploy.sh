#!/bin/sh
npm run build
rm -rf ../../../fullstackopenpart3/build
cp -r build ../../../fullstackopenpart3
