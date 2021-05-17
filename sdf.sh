gitDiff=$( git diff --exit-code origin/main -- components )
if [ $gitDiff -eq 1 ];
then
    echo 'components directory content changed'
    pullRequestPackageVersion=$( jq -r '.version' package.json )
    echo "PR package version: $pullRequestPackageVersion"
    echo "Latest package version on main: ${{ env.mainPackageVersion }}"
    if $(dpkg --compare-versions $pullRequestPackageVersion gt ${{ env.mainPackageVersion }});
    then
        echo 'Version updated'
    else
        echo 'Version did not update'
        exit 1
    fi
else
    echo 'components directory content did not change'
fi