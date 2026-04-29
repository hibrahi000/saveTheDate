import { createSlice } from "@reduxjs/toolkit";

/**
 * Single source of truth for the wedding details.
 * Edit any of these to update the entire invitation in one place.
 */
const initialState = {
  bride: "Fhoenix",
  groom: "Hashmat",
  // ISO 8601 — month is real (7 = July), day = 24, time 18:00
  dateISO: "2027-07-24T18:00:00",
  dateLong: "July 24, 2027",
  dateShort: "07.24.2027",
  dayName: "Saturday",
  timeText: "Six O'Clock in the Evening",
  venue: {
    name: "Ashton Gardens",
    line1: "4505 Highway 20",
    city: "Sugar Hill",
    state: "Georgia",
    zip: "30518",
  },
  rsvp: {
    email: "hashmatibrahimi0711@gmail.com",
    subject: "Save the Date — Fhoenix & Hashmat · July 24, 2027",
    body: "Congratulations! We are so excited for you. Counting down the days. ❤",
    hashtag: "#FhoenixAndHashmat2027",
    cta: "Express Your Joy",
  },
  cultural: "Afghan Heritage · African American Soul · Jamaican Spirit",
  formalNote: "Formal invitation to follow",
  inviteEyebrow: "Together with their families",

  /**
   * Proposal gallery — three photos fanned out below the ring like a keychain.
   * Center photo is the "main" with the largest caption; outer two flank it
   * at opposite tilts. Order: [left, center, right] from the viewer's perspective.
   */
  proposalGallery: [
    {
      src: "/proposal2.png",
      caption: "A million times yes",
      rotation: -10,
      scale: 0.86,
    },
    {
      src: "/proposal.png",
      caption: "The night he asked",
      rotation: -2,
      scale: 1.0,
    },
    {
      src: "/proposal3.png",
      caption: "Sailing into forever",
      rotation: 9,
      scale: 0.86,
    },
  ],
  proposalSublabel: "Aboard a cruise · the moment that started forever",

  /** Hero backdrop — empty chapel photo */
  heroBackdropSrc: "/ashton_garden_backdrop.png",
  siteUrl: "https://fhoenixandhash2027.xyz/",
};
const weddingSlice = createSlice({
  name: "wedding",
  initialState,
  reducers: {
    setField(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setVenue(state, action) {
      state.venue = { ...state.venue, ...action.payload };
    },
    setRsvp(state, action) {
      state.rsvp = { ...state.rsvp, ...action.payload };
    },
  },
});

export const { setField, setVenue, setRsvp } = weddingSlice.actions;
export default weddingSlice.reducer;
