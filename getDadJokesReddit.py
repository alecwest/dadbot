#!/usr/bin/python

import praw

def main():
    reddit = praw.Reddit(client_id='RDH7DCODcOC48g',
                         client_secret='8sSHr0222SsEg9g9Og1VOUJJz7E',
                         user_agent='getDadJokes')

    # TODO read these one by one, and I either approve or disapprove them 
    # to get sent to the dadJokes.txt file.
    for submission in reddit.subreddit('dadjokes').hot(limit=10):
        print(submission.title)
        print(submission.selftext.strip().split("\n")[0])

if __name__ == "__main__":
    main()