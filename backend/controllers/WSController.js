const { io }            = require('../server');
const WSClass           = require('../classes/WSClass');

const wsAddPostComment    = 'wsAddPostComment';

module.exports =
{
    addPostComment: async ({user_id, comment, newsfeed_id}) =>
    {
        let comment_res_obj = await WSClass.addPostComment({user_id, comment, newsfeed_id});

        if(comment_res_obj.status == 'success')
        {
            io.sockets.emit(wsAddPostComment,
            {
                ...comment_res_obj.comment
            });
        }
    },

}