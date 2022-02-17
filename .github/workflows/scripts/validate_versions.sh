#!/bin/bash

echo "PR version $PACKAGE_VERSION"
echo "PR lock version $PACKAGE_LOCK_VERSION"

if $(dpkg --compare-versions $PACKAGE_VERSION eq $PACKAGE_LOCK_VERSION);
then
    echo 'PR package lock version and PR package version are equal'
else
    echo 'PR package lock version and PR package version are not equal'
    exit 1
fi