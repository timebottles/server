import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  content : String
});

let PostSchema = new Schema({
  author : {
    type : String,
    required : true,
  },
  createTime : {
    type : Date,
    required : false,
    default : new Date(),
  },
  article : {
    type : Schema.Types.ObjectId,
    required : true
  }
});


// compile to model
let Artical = mongoose.model("Artical", ArticleSchema);
let Post = mongoose.model("Post", PostSchema);


class DBDemo {

  /** ------------  Simple insert  ------------ */
  static simpleInsert() {
    let simplePost = new Post({
      author : 'Peter',
      article : {
        content : 'this is peter\'s first article '
      }
    });

    console.log('Create time : ' + simplePost.createTime);

    return simplePost.save(function (err, post) {
              if (err) return console.error(err);

              console.log('Simple insert a post');
              console.log(post);
           });
  }


};
