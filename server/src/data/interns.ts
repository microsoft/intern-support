/** Static intern directory — loaded once at startup. */
export interface Intern {
  name: string;
  alias: string;
  role: string;
  team: string;
}

export const interns: Intern[] = [
  { name: "Anass Gallass", alias: "t-agallass", role: "SSP Intern", team: "AI Apps / Data" },
  { name: "Aryan Shah", alias: "t-aryanshah", role: "SE Intern", team: "AI Apps / Data" },
  { name: "Bertille Mathieu", alias: "t-bmathieu", role: "SE Intern", team: "AI Apps / Data" },
  { name: "Christian Bakhos", alias: "t-cbakhos", role: "SE Intern", team: "AI Apps / Data" },
  { name: "Elif Su Ergocmez", alias: "t-eergocmez", role: "CSAM Intern", team: "Customer Success" },
  { name: "Emre Tosun", alias: "t-emretosun", role: "CSA Intern", team: "Data Security" },
  { name: "João Rafael Avansini Baião", alias: "t-joaobaiao", role: "SE Intern", team: "AI Business" },
  { name: "Kamil Sielewonowski", alias: "t-kamils", role: "SSP Intern", team: "AI Business" },
  { name: "Karl Volckerick", alias: "t-karlv", role: "CSA Intern", team: "AI Apps" },
  { name: "Lorenzo Vecchi", alias: "t-lovecchi", role: "CSAM Intern", team: "Customer Success" },
  { name: "Mohamed Shafik", alias: "t-mshafik", role: "CSA Intern", team: "AI Business" },
  { name: "Narjiss Youyou", alias: "t-nyouyou", role: "CSA Intern", team: "AI Apps" },
  { name: "Olivia Lempa", alias: "t-olempa", role: "GA Intern", team: "Government Affairs" },
  { name: "Remy Van Den Spiegel", alias: "t-rspiegel", role: "SE Intern", team: "Security" },
  { name: "Romiya Nepali", alias: "t-rnepali", role: "CSA Intern", team: "AI Business" },
  { name: "Syed Mahdi", alias: "t-syedmahdi", role: "CSA Intern", team: "AI Apps" },
  { name: "Victor Maciel Castelo Branco", alias: "t-victorm", role: "CSA Intern", team: "Data Security" },
];
