#!/bin/bash

# set dependabot identifiers
dependabotName="dependabot[bot]"
committerName="web-flow"

if [ $USER_NAME = "$dependabotName" ];
then
    echo "$dependabotName was detected as PR creator"

    # get commits (for this PR) from github
    wget --quiet --method GET -O commits.json $LINK

    # extract from json response
    committers=$( jq -r  '[.[] | .committer | .login] | unique' commits.json )
    authors=$( jq -r  '[.[] | .author | .login] | unique' commits.json )
    committersLength=$( jq '. | length' <<< "$committers" )
    authorsLength=$( jq '. | length' <<< "$authors" )

    echo "Committer count: $committersLength"
    echo "Author count: $authorsLength"
    # check if there were more than one author (not only dependabot committed)
    if [ $committersLength -gt 1 ] || [ $authorsLength -gt 1 ];
    then
        echo 'There are too many committers and/or authors for a valid PR branch by $dependabotName'
        exit 1
    else
        # extract the only left committer & author
        committer=$( jq -r '.[0]' <<< $committers )
        author=$( jq -r '.[0]' <<< $authors )
        echo "Committer: $committer"
        echo "Author: $author"

        # check again if committer is same as dependabot name to be sure
        if [ $committer != "$committerName" ] || [ $author != "$dependabotName" ];
        then
            echo 'Committer and/or author do not have a valid value'
            exit 1
        else

            # set environment variable
            echo 'Committer and author are valid'
            echo "skipVersionValidation=True" >> $GITHUB_ENV
        fi
    fi
else
    # set environment variable
    echo "$dependabotName was not detected as PR creator"
    echo "skipVersionValidation=False" >> $GITHUB_ENV
fi