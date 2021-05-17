if $( git show --stat origin/main | grep -q 'components' );
then
    echo 'foo'
else
    echo 'bar'
fi