#!/bin/bash

mainPackageVersion=$( jq -r '.version' ./main/components/package.json )
echo "Main package version: $mainPackageVersion"
echo "Reset version of package.json and package-lock.json for diff"
echo "$( jq '.version = "null"' ./pr/components/package.json )" > ./pr/components/package.json
echo "$( jq '.version = "null"' ./pr/components/package-lock.json )" > ./pr/components/package-lock.json
echo "$( jq '.version = "null"' ./main/components/package.json )" > ./main/components/package.json
echo "$( jq '.version = "null"' ./main/components/package-lock.json )" > ./main/components/package-lock.json
echo "Calculate diff between main and PR branch"
diff -qr pr/components main/components && changes=0 || changes=1
echo "Re-assign version of package.json and package-lock.json"
echo "$( jq '.version = "$prPackageVersion"' ./pr/components/package.json )" > ./pr/components/package.json
echo "$( jq '.version = "$prPackageLockVersion"' ./pr/components/package-lock.json )" > ./pr/components/package-lock.json
echo "Update prPackageVersion environment variable"
currentPrPackageVersion=$( jq -r '.version' ./pr/components/package.json )
echo "prPackageVersion=$currentPrPackageVersion" >> $GITHUB_ENV
if [ $changes -eq 1 ];
then
  echo 'components directory content changed'
  echo "PR package version: $currentPrPackageVersion"
  echo "Main package version: $mainPackageVersion"
  if $(dpkg --compare-versions $currentPrPackageVersion gt $mainPackageVersion);
  then
    echo 'Version updated'
  else
    echo 'Version did not update'
    exit 1
  fi
else
  echo 'components directory content did not change'
  if $(dpkg --compare-versions $currentPrPackageVersion ne $mainPackageVersion);
  then
    echo 'Version changed but should not'
    exit 1
  else
    echo 'Version did not change'
  fi
fi