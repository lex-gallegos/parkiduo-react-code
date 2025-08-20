import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { companyValues } from '../constants/about-data';

export function AboutValues() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Nuestros valores
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Los principios que guían cada decisión y mejora en Parkiduo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {companyValues.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card key={index} className="text-center border-0 shadow-md hover-lift">
                <CardHeader>
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-primary">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}