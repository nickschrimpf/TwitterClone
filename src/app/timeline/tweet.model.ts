export interface Tweet {
    id:string;
    tweet:string;
    tweetDate:Date;
    postOwner:string;
    ownerID:string;
    ownerUniqueName:string;
    ownerPhotoURL:string;
    replies:any[];
    retweets:any[];
    likes:any[];
    retweetedBy:any[];
}
