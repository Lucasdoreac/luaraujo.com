import React from 'react';
import { Layout } from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to My Personal Website
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Hi, I'm Lucas Araujo. I build digital experiences and solve problems with code.
          </p>
          <div className="mt-8">
            <a
              href="/projects"
              className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              View My Projects
            </a>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            What I Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Web Development</h3>
              <p className="text-gray-600">
                Building modern, responsive websites with the latest technologies.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Problem Solving</h3>
              <p className="text-gray-600">
                Finding elegant solutions to complex technical challenges.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Exploring new technologies and pushing boundaries.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}