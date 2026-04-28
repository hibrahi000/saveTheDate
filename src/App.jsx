import React from 'react';
import Page from './components/Page';
import HeroSection from './components/sections/HeroSection';
import NamesSection from './components/sections/NamesSection';
import RingSection from './components/sections/RingSection';
import ProposalSection from './components/sections/ProposalSection';
import DateSection from './components/sections/DateSection';
import VenueSection from './components/sections/VenueSection';
import CountdownSection from './components/sections/CountdownSection';
import RsvpSection from './components/sections/RsvpSection';
import MusicPlayer from './components/MusicPlayer';

/**
 * Single-page invitation. Each section is its own tile component.
 * Reorder/add/remove sections by editing this list.
 */
export default function App() {
  return (
    <>
      <Page>
        <HeroSection />
        <NamesSection />
        <RingSection />
        <ProposalSection />
        <DateSection />
        <VenueSection />
        <CountdownSection />
        <RsvpSection />
      </Page>
      <MusicPlayer />
    </>
  );
}
