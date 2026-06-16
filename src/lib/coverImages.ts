import type { ImageMetadata } from 'astro';
import ontarioBoardAgm from '../assets/images/ontario-board-agm.png';
import chessPieces from '../assets/images/chess-pieces.jpg';
import condoBuilding from '../assets/images/condo-building.jpg';
import boardMeeting from '../assets/images/board-meeting.jpg';
import votingBallot from '../assets/images/voting-ballot.jpg';
import checklistDesk from '../assets/images/checklist-desk.jpg';
import virtualMeeting from '../assets/images/virtual-meeting.jpg';
import governanceMeeting from '../assets/images/governance-meeting.jpg';

export const coverImages: Record<string, ImageMetadata> = {
  'ontario-board-agm.png': ontarioBoardAgm,
  'chess-pieces.jpg': chessPieces,
  'condo-building.jpg': condoBuilding,
  'board-meeting.jpg': boardMeeting,
  'voting-ballot.jpg': votingBallot,
  'checklist-desk.jpg': checklistDesk,
  'virtual-meeting.jpg': virtualMeeting,
  'governance-meeting.jpg': governanceMeeting,
};

export function resolveCoverImage(filename?: string): ImageMetadata | undefined {
  if (!filename) return undefined;
  return coverImages[filename];
}
