package logs

type Position struct {
	Position int64  `json:"position"`
	Filename string `json:"filename,omitempty"`
}

type LogResult struct {
	Logs      []string   `json:"logs"`
	Positions []Position `json:"positions,omitempty"`
}
