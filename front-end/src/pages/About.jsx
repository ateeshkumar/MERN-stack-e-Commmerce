import React from 'react'
import Layout from '../component/layout/Layout'
import about from '../assets/about.jpg'
import './css/about.css';
const About = () => {
  return (
    <div>
      <Layout title='about'>
        <div className="contact about">
          <div className="contact-img">
            <img src={about} alt="contact"/>
          </div>
          <div className="contact-detail">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto rerum reprehenderit totam autem nobis odio eveniet aperiam minus consequatur libero, recusandae accusamus maxime tempora tempore nam ullam in ab neque.
            Est saepe ratione eaque aspernatur soluta harum. Perspiciatis eum labore, quis eos tempora aperiam earum natus reiciendis facilis voluptatem quisquam delectus reprehenderit illum consequatur dolor tenetur officia vel optio assumenda.
            Impedit, animi quod a rem mollitia</p>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default About
