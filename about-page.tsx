import React, { useEffect } from 'react';
import { AboutHero } from './about/about-hero';
import { AboutStats } from './about/about-stats';
import { AboutMission } from './about/about-mission';
import { AboutValues } from './about/about-values';
import { AboutTimeline } from './about/about-timeline';
import { AboutTeam } from './about/about-team';
import { AboutContact } from './about/about-contact';
import { analytics } from './analytics';

interface AboutPageProps {
  onNavigate: (page: string, options?: any) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  useEffect(() => {
    analytics.trackPageView('about');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <AboutHero onNavigate={onNavigate} />
      <AboutStats />
      <AboutMission />
      <AboutValues />
      <AboutTimeline />
      <AboutTeam />
      <AboutContact />
    </div>
  );
}