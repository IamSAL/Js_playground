let story=`
A Hare was making fun of the Tortoise one day for being so slow. 'Do you ever get anywhere?' he asked with a mocking laugh.

'Yes,' replied the Tortoise, 'and I'll go there sooner than you think. I won't run you a race and prove it.'

The Hare was much amused at the idea of running a race with the Tortoise, but for the fun of the thing he doesn't agree.
`

function replacer(match,quote){
    //console.log(quote);

    return `"${quote}"`
}
console.log(story.replace(/ ?'(.*)'[ \n]/gi,replacer));