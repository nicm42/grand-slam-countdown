import tournamentData from './dates.json';

export default () => ({
  message: '',
  colour: '',
  tournaments: [],

  async getData() {
    this.tournaments = tournamentData;
  },

  calculateDates(selectedTournament) {
    const thisTournament = this.tournaments.find(
      (tournament) => tournament.slam === selectedTournament
    );
    const today = new Date();
    const slamStart = new Date(
      today.getFullYear(),
      thisTournament.start[1] - 1,
      thisTournament.start[0]
    );
    const slamEnd = new Date(
      today.getFullYear(),
      thisTournament.end[1] - 1,
      thisTournament.end[0]
    );

    if (today > slamEnd) {
      this.message = `${thisTournament.slam} has already happened this year :(`;
      this.colour = 'red';
    }
    if (today >= slamStart && today <= slamEnd) {
      this.message = `${thisTournament.slam} is currently being played`;
      this.colour = 'blue';
    }
    if (today < slamStart) {
      const daysUntilStart = Math.floor(
        (slamStart - today) / (1000 * 60 * 60 * 24)
      );
      this.message = `${thisTournament.slam} will start in ${daysUntilStart} ${
        daysUntilStart === 1 ? 'day' : 'days'
      }`;
      if (daysUntilStart < 7) {
        this.message += '. Are you excited?';
      }
      this.colour = 'green';
    }
  },
});
