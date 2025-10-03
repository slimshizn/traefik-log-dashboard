package routes

import (
	"net/http"
	"os"
	"path/filepath"

	"github.com/hhftechnology/traefik-log-dashboard/agent/internal/config"
	"github.com/hhftechnology/traefik-log-dashboard/agent/internal/utils"
	"github.com/hhftechnology/traefik-log-dashboard/agent/pkg/logs"
	"github.com/hhftechnology/traefik-log-dashboard/agent/pkg/system"
)

// Handler manages HTTP routes and dependencies
type Handler struct {
	config *config.Config
}

// NewHandler creates a new Handler with the given configuration
func NewHandler(cfg *config.Config) *Handler {
	return &Handler{
		config: cfg,
	}
}

// HandleAccessLogs handles requests for access logs
func (h *Handler) HandleAccessLogs(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	position := utils.GetQueryParamInt64(r, "position", 0)
	lines := utils.GetQueryParamInt(r, "lines", 1000)

	// FIX: Adapt the call to the new logs.GetLogs signature.
	// We construct a slice of positions as required by the new function.
	positions := []logs.Position{{Position: position}}
	result, err := logs.GetLogs(h.config.AccessPath, positions, false, false)
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Manually truncate the logs to the requested number of lines,
	// as this parameter was likely removed from the GetLogs function.
	if len(result.Logs) > lines {
		result.Logs = result.Logs[:lines]
	}

	utils.RespondJSON(w, http.StatusOK, result)
}

// HandleErrorLogs handles requests for error logs
func (h *Handler) HandleErrorLogs(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	position := utils.GetQueryParamInt64(r, "position", 0)
	lines := utils.GetQueryParamInt(r, "lines", 100)

	// FIX: Adapt the call to the new signature.
	positions := []logs.Position{{Position: position}}
	result, err := logs.GetLogs(h.config.ErrorPath, positions, false, false)
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	if len(result.Logs) > lines {
		result.Logs = result.Logs[:lines]
	}

	utils.RespondJSON(w, http.StatusOK, result)
}

// HandleSystemLogs handles requests for system logs listing
func (h *Handler) HandleSystemLogs(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	logSizes, err := logs.GetLogSizes(h.config.AccessPath)
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	utils.RespondJSON(w, http.StatusOK, logSizes)
}

// HandleSystemResources handles requests for system resource statistics
func (h *Handler) HandleSystemResources(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if !h.config.SystemMonitoring {
		utils.RespondError(w, http.StatusForbidden, "System monitoring is disabled")
		return
	}

	stats, err := system.GetSystemStats()
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	utils.RespondJSON(w, http.StatusOK, stats)
}

// HandleStatus handles health check requests
func (h *Handler) HandleStatus(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	accessPathExists := false
	if info, err := os.Stat(h.config.AccessPath); err == nil {
		accessPathExists = true
		if info.IsDir() {
			entries, _ := os.ReadDir(h.config.AccessPath)
			if len(entries) == 0 {
				accessPathExists = false
			}
		}
	}

	errorPathExists := false
	if info, err := os.Stat(h.config.ErrorPath); err == nil {
		errorPathExists = true
		if info.IsDir() {
			entries, _ := os.ReadDir(h.config.ErrorPath)
			if len(entries) == 0 {
				errorPathExists = false
			}
		}
	}

	status := map[string]interface{}{
		"status":              "ok",
		"access_path":         h.config.AccessPath,
		"access_path_exists":  accessPathExists,
		"error_path":          h.config.ErrorPath,
		"error_path_exists":   errorPathExists,
		"system_monitoring":   h.config.SystemMonitoring,
		"auth_enabled":        h.config.AuthToken != "",
	}

	utils.RespondJSON(w, http.StatusOK, status)
}

// HandleGetLog handles requests for a specific log file
func (h *Handler) HandleGetLog(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	filename := utils.GetQueryParam(r, "filename", "")
	if filename == "" {
		utils.RespondError(w, http.StatusBadRequest, "filename parameter is required")
		return
	}

	position := utils.GetQueryParamInt64(r, "position", 0)
	lines := utils.GetQueryParamInt(r, "lines", 100)

	fullPath := filepath.Join(h.config.AccessPath, filename)

	// FIX: Adapt the call to the new signature.
	positions := []logs.Position{{Position: position, Filename: filename}}
	result, err := logs.GetLogs(fullPath, positions, false, false)
	if err != nil {
		utils.RespondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	if len(result.Logs) > lines {
		result.Logs = result.Logs[:lines]
	}

	utils.RespondJSON(w, http.StatusOK, result)
}