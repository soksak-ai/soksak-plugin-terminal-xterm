package terminal

type Owner interface {
	ServiceName() string
	ServiceShutdown() error
	Open(id, stream string, cols, rows uint16) (Handle, error)
	Write(handle Handle, data string) error
	Resize(handle Handle, cols, rows uint16) error
	Close(handle Handle) error
	TraceInput(handle Handle, event InputTrace) error
	Status() []Status
	Reap() int
}
