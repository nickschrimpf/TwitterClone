export interface Tweet {
    id:string;
    tweet:string;
    tweetDate:Date;
    auther:string;
    autherId:string;
    autherDisplayName:string;
    autherPhotoURL:string;
    replies:any[];
    retweets:any[];
    likes:any[];
    retweetedBy:any[];
}
