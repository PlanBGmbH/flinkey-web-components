#!/bin/bash

packageVersion=$( jq -r '.version' package.json )
echo "PACKAGE_VERSION=$packageVersion" >> $GITHUB_ENV
echo "Current version: $prPackageVersion"

packageLockVersion=$( jq -r '.version' package-lock.json )
echo "PACKAGE_LOCK_VERSION=$packageLockVersion" >> $GITHUB_ENV
echo "Current lock version: $packageLockVersion"
