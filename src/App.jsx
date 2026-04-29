import React from 'react';
import Page from './components/Page';
import HeroSection from './components/sections/HeroSection';
import UnionSection from './components/sections/UnionSection';
import DateSection from './components/sections/DateSection';
import VenueSection from './components/sections/VenueSection';
import DetailsSection from './components/sections/DetailsSection';
import CountdownSection from './components/sections/CountdownSection';
import RsvpSection from './components/sections/RsvpSection';
import MusicPlayer from './components/MusicPlayer';
// import ScrollControl from './components/ScrollControl';
import SectionNavigator from './components/SectionNavigator';
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Single-page invitation. Each section is its own tile component.
 * Reorder/add/remove sections by editing this list.
 */
export default function App() {
  return (
    <>
      <SpeedInsights />
      <Page>
        <HeroSection />
        <UnionSection />     {/* names + ring + proposal photo unified */}
        <DateSection />
        <VenueSection />
        <DetailsSection />   {/* adults only + black tie */}
        <CountdownSection />
        <RsvpSection />
      </Page>
      <MusicPlayer />
      <SectionNavigator />
    </>
  );
}
