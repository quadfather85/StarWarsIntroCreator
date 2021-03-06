import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DonateOrNotDonate from './DonateOrNotDonate';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';
import ContactButton from './ContactButton';
import EmailRequestField from './EmailRequestField';
import PaymentModule from './PaymentModule';
import { calculateTimeToRender } from '../extras/auxiliar';
import { QUEUED } from './constants';
import Atat from './Atat';

const RequestDownloadPage = ({
  donate,
  status,
  openingKey,
  finishRequestHandle,
  ...props
}) => {
  const { queueSize, queuePosition } = status;
  const isQueued = status.status === QUEUED;

  const position = 1 + isQueued ? queuePosition : queueSize;

  const timeToRender = calculateTimeToRender(position);
  const urlToEdit = `#!/${openingKey}/edit`;

  const donateScreen = (
    <div>
      <p>
        Great choice! You can donate how much you want but there
        is a minimum to receive the video.
        <ul>
          <li>At least <b>7 US Dollars</b> for HD video (1280x720).</li>
          <li>At least <b>10 US Dollars</b> for Full HD video (1920x1080)</li>
          <li>At least <b>30 US Dollars</b> for more customizable video with
              the Death Star image replacement (Contact us via email to submit your image).
          </li>
        </ul>
      </p>

      <p>
        <b>Attention! </b>
        Before sending the download request make sure there are no typos in your text
        to grant that your video will be with the correct text.&nbsp;
        <a href={urlToEdit}>
          Click here to go back and check your text.
        </a>
      </p>

      <PaymentModule
        openingKey={openingKey}
      />
    </div>
  );

  const notQueuedText = 'will be';
  const qeuedText = 'is';

  const youCanStillDonate = (
    <Fragment>
      <Atat />
      <p>
        Your video request {isQueued ? qeuedText : notQueuedText}{' '}
        queued at position <b>{position}</b>.
        It may take up to <b>{timeToRender}</b> to have your video rendered.
        You can still donate to get it earlier if you want.
        <p>
          <DonateOrNotDonate {...props} hideNoDonateOption />
        </p>
      </p>
      <p>
        Fill your email below and when your video is ready
        you will receive a message with the link to download it.
        We promise not to send spam!
      </p>
    </Fragment>
  );

  return (
    <div>
      {donate && donateScreen}
      {!donate && youCanStillDonate}

      <TermsOfServiceAcceptance />
      <ContactButton />
      <EmailRequestField
        openingKey={openingKey}
        finishRequestHandle={finishRequestHandle}
        isDonating={donate}
      />
    </div>
  );
};

RequestDownloadPage.propTypes = {
  donate: PropTypes.bool,
  status: PropTypes.object,
  openingKey: PropTypes.string,
  finishRequestHandle: PropTypes.func,
};

export default RequestDownloadPage;
