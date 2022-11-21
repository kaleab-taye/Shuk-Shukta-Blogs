import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faCommentDots,
  faEye,
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowDown,
  faArrowUp,
  faEllipsis,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Snackbar } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ConfirmationDialogue, { toggleModal } from './ConfirmationDialogue';
import HomeBlogCardIcons from './Ui/Home-Blog-Card-Icons';

export default function BlogMetaSection(props) {
  const webUrl = process.env.url;
  const router = useRouter();

  const [votingAlert, setVotingAlert] = useState('');

  const blogKeyEnum = {
    idl: 'idl',
    canceled: 'canceled',
    keyLogging: 'keyLogging',
    logged: 'logged',
  };
  const [blogKeyStatus, setBlogKeyStatus] = useState(blogKeyEnum.idl);
  const [blogKey, setBlogKey] = useState('');

  const [blogMeta, setBlogMeta] = useState(props.blog.blogMeta);
  const [vote, setVote] = useState('');
  const voteEnum = {
    upVoting: 'Up Voting . . .',
    downVoting: 'Down Voting . . .',
    downVoted: 'Down Voted',
    upVoted: 'Up Voted',
    unVoting: 'Removing Vote . . .',
    removed: 'Removed',
    idle: '',
    failed: 'Failed',
  };
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const statusEnum = {
    processing: 'Processing . . .',
    success: 'Success',
    failure: 'Process Failed',
  };
  // check if blog has been voted
  useEffect(() => {
    try {
      if (
        JSON.parse(localStorage.getItem(props.blog.id)).vote ===
          voteEnum.downVoted ||
        JSON.parse(localStorage.getItem(props.blog.id)).vote ===
          voteEnum.upVoted
      ) {
        setVote(JSON.parse(localStorage.getItem(props.blog.id)).vote);
      } else {
        setVote(voteEnum.idle);
      }
    } catch (error) {
      setVote(voteEnum.idle);
    }
  }, []);

  let date = new Date(parseInt(blogMeta.date));

  async function upVoteHandler() {
    if (vote === voteEnum.upVoted) {
      await undoUpVote();
    } else if (vote === voteEnum.downVoted) {
      await undoDownVote();
      // console.log('undo down done', vote);
      await upVote();
    } else {
      await upVote();
    }
  }
  async function downVoteHandler() {
    if (vote === voteEnum.downVoted) {
      await undoDownVote();
    } else if (vote === voteEnum.upVoted) {
      await undoUpVote();
      // console.log('undo up done', vote);
      await downVote();
    } else {
      await downVote();
    }
  }

  async function undoUpVote() {
    setVote((v) => voteEnum.unVoting);
    let headersList = {
      'Content-Type': 'application/json',
    };
    let bodyContent = JSON.stringify({});
    try {
      let response = await fetch(
        `${webUrl}/api/blogs/${props.blog.id}/upvote_undo`,
        {
          method: 'POST',
          body: bodyContent,
          headers: headersList,
        }
      );
      if (response.status === 200) {
        // let newBlogMeta =
        setBlogMeta((blogMeta) => ({
          ...blogMeta,
          upVote: parseInt(blogMeta.upVote) - 1,
        }));
        setVote((v) => voteEnum.removed);
        // setTimeout(() => {
        setVote((v) => voteEnum.idle);
        // }, '3000');
        //store vote locally
        let localData = {
          ...JSON.parse(localStorage.getItem(props.blog.id)),
          vote: voteEnum.idle,
        };
        localStorage.setItem(props.blog.id, JSON.stringify(localData));
      } else {
        throw response.text();
      }
    } catch (error) {
      console.error(error);
      setError(error);
      setVote((v) => voteEnum.failed);
    }
  }
  async function undoDownVote() {
    await setVote((v) => voteEnum.unVoting);
    let headersList = {
      'Content-Type': 'application/json',
    };
    let bodyContent = JSON.stringify({});
    try {
      let response = await fetch(
        `${webUrl}/api/blogs/${props.blog.id}/downvote_undo`,
        {
          method: 'POST',
          body: bodyContent,
          headers: headersList,
        }
      );
      if (response.status === 200) {
        // let newBlogMeta = await {
        //   ...blogMeta,
        //   downVote: parseInt(blogMeta.downVote) - 1,
        // };
        // await setBlogMeta(newBlogMeta);
        setBlogMeta((blogMeta) => ({
          ...blogMeta,
          downVote: parseInt(blogMeta.downVote) - 1,
        }));
        setVote((v) => voteEnum.removed);
        // setTimeout(async () => {
        setVote((v) => voteEnum.idle);
        // }, '3000');
        //store vote locally
        let localData = {
          ...JSON.parse(localStorage.getItem(props.blog.id)),
          vote: voteEnum.idle,
        };
        localStorage.setItem(props.blog.id, JSON.stringify(localData));
      } else {
        throw response.text();
      }
    } catch (error) {
      console.error(error);
      setError(error);
      setVote((v) => voteEnum.failed);
    }
  }

  async function upVote() {
    setVote((v) => voteEnum.upVoting);
    let headersList = {
      'Content-Type': 'application/json',
    };
    let bodyContent = JSON.stringify({});
    try {
      let response = await fetch(
        `${webUrl}/api/blogs/${props.blog.id}/upvote`,
        {
          method: 'POST',
          body: bodyContent,
          headers: headersList,
        }
      );
      if (response.status === 200) {
        // let newBlogMeta = {
        //   ...blogMeta,
        //   upVote: parseInt(blogMeta.upVote) + 1,
        // };
        // setBlogMeta(newBlogMeta);
        setBlogMeta((blogMeta) => ({
          ...blogMeta,
          upVote: parseInt(blogMeta.upVote) + 1,
        }));
      }
      let data = await response.text();
      setVote((v) => voteEnum.upVoted);
      //store vote locally
      let localData = {
        ...JSON.parse(localStorage.getItem(props.blog.id)),
        vote: voteEnum.upVoted,
      };
      localStorage.setItem(props.blog.id, JSON.stringify(localData));
    } catch (error) {
      console.error(error);
      setError(error);
      setVote((v) => voteEnum.failed);
    }
  }
  async function downVote() {
    setVote((v) => voteEnum.downVoting);
    let headersList = {
      'Content-Type': 'application/json',
    };
    let bodyContent = JSON.stringify({});
    try {
      let response = await fetch(
        `${webUrl}/api/blogs/${props.blog.id}/downvote`,
        {
          method: 'POST',
          body: bodyContent,
          headers: headersList,
        }
      );
      if (response.status === 200) {
        setBlogMeta((blogMeta) => ({
          ...blogMeta,
          downVote: parseInt(blogMeta.downVote) + 1,
        }));
        setVote((v) => voteEnum.downVoted);
        //store vote locally
        let localData = {
          ...JSON.parse(localStorage.getItem(props.blog.id)),
          vote: voteEnum.downVoted,
        };
        localStorage.setItem(props.blog.id, JSON.stringify(localData));
      }
    } catch (error) {
      console.error(error);
      setVote((v) => voteEnum.idle);
    }
  }
  async function editBlog(e) {
    let insertedKey = blogKey;
    if (insertedKey) {
      try {
        setStatus(statusEnum.processing);
        setError('');
        let headersList = {
          'Content-Type': 'application/json',
        };
        let bodyContent = JSON.stringify({
          blogKey: insertedKey,
        });
        var response = await fetch(`${webUrl}/api/blogs/${props.blog.id}/key`, {
          method: 'POST',
          body: bodyContent,
          headers: headersList,
        });
        if (response.status === 200) {
          setStatus(statusEnum.success);
          router.push(`/blogs/${props.blog.id}/edit`);
        } else {
          setStatus(statusEnum.failure);
          setError('Wrong Pass Key');
        }
      } catch (error) {
        setError(`error : ${error}`);
      }
    }
  }
  useEffect(() => {
    setVotingAlert(vote);
  }, [vote]);
  return (
    <>
      {/* new blog meta */}
      <div className="grid grid-cols-5 my-auto mr-auto gap-5  px-4">
        {/* upvote */}
        {vote === voteEnum.upVoted ? (
          <HomeBlogCardIcons
            icon={faArrowUp}
            icon_data_tip="up vote"
            data_data_tip="total upVotes"
            data={blogMeta.upVote}
            className="cursor-pointer"
            onClick={() => upVoteHandler()}
            theme={'selected'}
            color={'text-success'}
          />
        ) : (
          <HomeBlogCardIcons
            icon={faArrowUp}
            icon_data_tip="up vote"
            data_data_tip="total upVotes"
            data={blogMeta.upVote}
            className="cursor-pointer"
            onClick={() => upVoteHandler()}
          />
        )}
        {/* downvote */}
        {vote === voteEnum.downVoted ? (
          <HomeBlogCardIcons
            icon={faArrowDown}
            icon_data_tip="down vote"
            data_data_tip="total downVotes"
            data={blogMeta.downVote}
            className="cursor-pointer"
            onClick={() => downVoteHandler()}
            theme={'selected'}
            color={'text-failure'}
          />
        ) : (
          <HomeBlogCardIcons
            icon={faArrowDown}
            icon_data_tip="down vote"
            data_data_tip="total downVotes"
            data={blogMeta.downVote}
            className="cursor-pointer"
            onClick={() => downVoteHandler()}
          />
        )}
        {/* comment */}
        <HomeBlogCardIcons
          icon={faCommentDots}
          icon_data_tip="comment"
          data_data_tip="total comments"
          data={props.blog.comment.length}
          className="cursor-pointer"
        />
        {/* seen */}
        <HomeBlogCardIcons icon={faEye} data_tip="seen" data={blogMeta.seen} />
        {/* more option */}
        {/* <HomeBlogCardIcons
          icon={faEllipsis}
          data_tip="more option"
          className="cursor-pointer"
        /> */}
      </div>
      <div className="mx-auto text-center my-auto h-2">
        <div>
          <Snackbar
            open={votingAlert === voteEnum.upVoted}
            autoHideDuration={3000}
            onClose={() => setVotingAlert(voteEnum.idle)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            // onClose={handleClose}
          >
            <Alert
              // onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              {votingAlert}
            </Alert>
          </Snackbar>
          <Snackbar
            open={votingAlert === voteEnum.downVoted ||votingAlert === voteEnum.failed}
            autoHideDuration={3000}
            onClose={() => setVotingAlert(voteEnum.idle)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            // onClose={handleClose}
          >
            <Alert
              // onClose={handleClose}
              severity="error"
              sx={{ width: '100%' }}
            >
              {votingAlert}
            </Alert>
          </Snackbar>
          <Snackbar
            open={
              votingAlert === voteEnum.upVoting ||
              votingAlert === voteEnum.downVoting ||
              votingAlert === voteEnum.unVoting ||
              votingAlert === voteEnum.removed
            }
            autoHideDuration={6000}
            // onClose={() => setVotingAlert('')}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            // onClose={handleClose}
          >
            <Alert
              // onClose={handleClose}
              severity="info"
              sx={{ width: '100%' }}
            >
              {votingAlert}
            </Alert>
          </Snackbar>
        </div>

        
      </div>
    </>
  );
}
