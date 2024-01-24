import React, { useEffect } from 'react';
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './Head.scss';

const Head = () => {
//   const navigate = useNavigate();

  useEffect(() => {
  }, []);

//   const goBack = () => {
//     navigate(-1);
//   };

  return (
    <header className="header__container header-wrapper">
      {/* <Button variant='primary' onClick={goBack}>Go back</Button>{' '} */}
      
      <div className='link__wrapper'>
        <Link className='link__item' to={'/tasks'}>Go to tasks</Link>
      </div>
    </header>
  );
};

export default Head;