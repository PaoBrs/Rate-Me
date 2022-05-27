import React from 'react'
import { faEnvelope, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer className=' bg-orange-500'>

    <div className='grid grid-cols-3  gap-5'>

      <div className='hidden lg:block'>

        <div className='flex flex-col items-center pt-8'>
          <a className='text-base text-5xl whitespace-nowrap text-light-1' href='.'>
        <FontAwesomeIcon icon={faStar} className='text-white  fa-3x'/>
          </a>
        </div>

      </div>

      

      <div className='flex flex-col justify-center'>
        <h2 className='font-bold'>
        Developed by
        </h2>

        <p className='text-white text-3xl'>Paola Barbosa Medina</p>
        <p className='text-white'>Full Stack developer Always exited to learn new technologies. </p>
      </div>

      <div className='flex flex-col justify-center'>
        <h2 className='font-bold'>
          Contact info
        </h2>

        <div className='p-3 flex flex-row flex-wrap gap-6'>
          <a className='text-base text-white font-medium whitespace-nowrap text-light-1' href='mailto:p.barbosa93@gmail.com' target='_blank' rel='noreferrer'> 
        <div className='flex flex-row'>
        <FontAwesomeIcon icon={faEnvelope} className='text-white-500  fa-3x pr-2'/><p className='text-3xl'> p.barbosa93@gmail.com</p>
        </div>
          </a>

          <a className='text-base text-white' href='https://www.linkedin.com/in/paola-barbosa-medina/' target='_blank' rel='noreferrer'>
          <div className='flex flex-row'>
        <FontAwesomeIcon icon={faLinkedin} className='text-white-500  fa-3x pr-2'/><p className='text-3xl'> Paola Barbosa</p>
        </div>
          </a>
          </div>

        <a className=' text-base text-white' href='https://github.com/PaoBrs' target='_blank' rel='noreferrer'>
          <div className='flex flex-row'>
        <FontAwesomeIcon icon={faGithub} className='text-white-500  fa-3x pr-2'/><p className='text-3xl'> GitHub</p>
        </div>
          </a>

      </div>

    </div>

    <small className='block text-center pb-2'>
      Copyright
      {' '}
      <i className='fa fa-copyright' aria-hidden='true' />
      {' '}
      2022 -2030
    </small>
  </footer>
);

export default Footer;