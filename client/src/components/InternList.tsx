import {
  Caption1,
  Dropdown,
  Input,
  MessageBar,
  MessageBarBody,
  Option,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Title2,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getInterns } from "../utils/api";

const ALL = "__all__";

const useStyles = makeStyles({
  container: {
    maxWidth: "960px",
    margin: "0 auto",
    padding: tokens.spacingHorizontalXL,
    paddingBottom: "48px",
  },
  title: {
    marginBottom: tokens.spacingVerticalL,
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
    alignItems: "end",
  },
  search: {
    minWidth: "220px",
    flex: 1,
  },
  dropdown: {
    minWidth: "160px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    padding: tokens.spacingVerticalXXXL,
  },
  emailLink: {
    color: "inherit",
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
});

export function InternList() {
  const styles = useStyles();
  const {
    data: interns = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["interns"],
    queryFn: getInterns,
    staleTime: Infinity,
  });

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState(ALL);
  const [teamFilter, setTeamFilter] = useState(ALL);

  const roles = useMemo(
    () => [...new Set(interns.map((i) => i.role).filter(Boolean))].sort(),
    [interns],
  );

  const teams = useMemo(
    () => [...new Set(interns.map((i) => i.team).filter(Boolean))].sort(),
    [interns],
  );

  const filtered = useMemo(() => {
    let result = interns;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.alias.toLowerCase().includes(q) ||
          i.role.toLowerCase().includes(q) ||
          i.team.toLowerCase().includes(q),
      );
    }

    if (roleFilter !== ALL) {
      result = result.filter((i) => i.role === roleFilter);
    }

    if (teamFilter !== ALL) {
      result = result.filter((i) => i.team === teamFilter);
    }

    return result;
  }, [interns, search, roleFilter, teamFilter]);

  if (isLoading) {
    return (
      <div className={styles.center}>
        <Spinner label="Loading interns…" size="medium" labelPosition="below" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Title2 className={styles.title} block>
        Intern Directory
      </Title2>

      {error && (
        <MessageBar
          intent="error"
          style={{ marginBottom: tokens.spacingVerticalM }}
        >
          <MessageBarBody>
            {error instanceof Error ? error.message : "Failed to fetch interns"}
          </MessageBarBody>
        </MessageBar>
      )}

      <div className={styles.filters}>
        <Input
          className={styles.search}
          placeholder="Search interns…"
          value={search}
          onChange={(_e, data) => setSearch(data.value)}
          contentBefore={<SearchRegular />}
          appearance="outline"
        />

        {roles.length > 0 && (
          <Dropdown
            className={styles.dropdown}
            placeholder="All roles"
            aria-label="Filter by role"
            value={roleFilter === ALL ? "All roles" : roleFilter}
            onOptionSelect={(_e, data) =>
              setRoleFilter(data.optionValue ?? ALL)
            }
          >
            <Option value={ALL}>All roles</Option>
            {roles.map((r) => (
              <Option key={r} value={r}>
                {r}
              </Option>
            ))}
          </Dropdown>
        )}

        {teams.length > 0 && (
          <Dropdown
            className={styles.dropdown}
            placeholder="All teams"
            aria-label="Filter by team"
            value={teamFilter === ALL ? "All teams" : teamFilter}
            onOptionSelect={(_e, data) =>
              setTeamFilter(data.optionValue ?? ALL)
            }
          >
            <Option value={ALL}>All teams</Option>
            {teams.map((t) => (
              <Option key={t} value={t}>
                {t}
              </Option>
            ))}
          </Dropdown>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Alias</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Team</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((intern) => (
            <TableRow key={intern.alias}>
              <TableCell>{intern.name}</TableCell>
              <TableCell>
                <a
                  className={styles.emailLink}
                  href={`mailto:${intern.alias}@microsoft.com`}
                >
                  {intern.alias}
                </a>
              </TableCell>
              <TableCell>
                <Caption1>{intern.role}</Caption1>
              </TableCell>
              <TableCell>
                <Caption1>{intern.team}</Caption1>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
