import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Linkedin } from 'lucide-react';
import { teamMembers } from '../constants/about-data';

export function AboutTeam() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Nuestro equipo
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Las personas que hacen posible Parkiduo cada día
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center border-0 shadow-md hover-lift">
              <CardHeader>
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <p className="text-brand-primary font-medium">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(member.linkedin, '_blank')}
                  className="text-brand-primary hover:bg-brand-primary/5"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}