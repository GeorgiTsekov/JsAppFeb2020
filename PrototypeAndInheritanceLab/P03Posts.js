function solve() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }
    
        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`
        }
    }
    
    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }
    
        addComment(comment) {
            this.comments.push(comment);
        }
    
        toString() {
            let result = '';
            result += super.toString();
            result += `\nRating: ${this.likes - this.dislikes}`
    
            if (this.comments.length > 0) {
                result += `\nComments:`
                this.comments.forEach(c => {
                    result += `\n * ${c}`
                });
            }
    
            return result;
        }
    }
    
    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = views;
        }
    
        view() {
            this.views++;
            return this;
        }
    
        toString() {
            return super.toString() + `\nViews: ${this.views}`
        }
    }

    return {
        Post,
        SocialMediaPost,
        BlogPost
    }
}

let classes = solve();
let Post = classes.Post;
let SocialMediaPost = classes.SocialMediaPost;
let BlogPost = classes.BlogPost;
let post = new Post("Post", "Content");

console.log(post.toString());

// Post: Post
// Content: Content

let scm = new SocialMediaPost("TestTitle", "TestContent", 25, 30);

scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");

console.log(scm.toString());

let bp = new BlogPost("TestTitle", "TestContent", 3);
console.log(bp.view())
console.log(bp.toString());
// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
//  * Good post
//  * Very good post
//  * Wow!
