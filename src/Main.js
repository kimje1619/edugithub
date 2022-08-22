import React from 'react';
const Main = (props) => {
	return (
		<>
			<h3>두번째 커밋!</h3>
      <p>conflict1 브랜치가 나중에 작성한 내용입니다.</p>
=======
			<h3>첫번쨰 커밋!</h3>
      <p>conflict1 브랜치가 먼저 작성한 내용입니다.</p>
>>>>>>> 1bd57edd8d57efc50d275e48084d8369bb74b6d1
		</>
	);
};

export default Main;
