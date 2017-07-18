const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

const mapPlayer = '\
<node> \
<interface name="org.mpris.MediaPlayer2.Player"> \
<method name="PlayPause" /> \
<method name="Pause" /> \
<method name="Play" /> \
<method name="Stop" /> \
<method name="Next" /> \
<method name="Previous" /> \
<method name="SetPosition"> \
<arg type="o" direction="in" /> \
<arg type="x" direction="in" /> \
</method> \
<property name="CanPause" type="b" access="read" /> \
<property name="CanSeek" type="b" access="read" /> \
<property name="Metadata" type="a{sv}" access="read" /> \
<property name="Volume" type="d" access="readwrite" /> \
<property name="PlaybackStatus" type="s" access="read" /> \
<property name="Position" type="x" access="read" /> \
<signal name="Seeked"> \
<arg type="x" direction="out" /> \
</signal> \
</interface> \
</node>';
let dbusProxy = Gio.DBusProxy.makeProxyWrapper(mapPlayer);

function player() {
	return new dbusProxy(Gio.DBus.session,
			'org.mpris.MediaPlayer2.spotify',
			'/org/mpris/MediaPlayer2');
}

function PlayPause() {
	return player().PlayPauseRemote()
}

function Previous() {
	return player().PreviousRemote()
}

function Next() {
	return player().NextRemote()
}

function Stop() {
	return player().StopRemote()
}

function init() {
	menu = Main.panel.statusArea.appMenu._container;

	btnPlayPause = new St.Bin({
		style_class: 'panel-button',
		reactive: true,
		can_focus: true,
		x_fill: true,
		y_fill: false,
		track_hover: true
	});
	let icPlayPause = new St.Icon({
		icon_name: 'media-playback-start-symbolic',
		style_class: 'system-status-icon'
	});
	btnPlayPause.set_child(icPlayPause);
	btnPlayPause.connect('button-press-event', PlayPause);

	btnPrevious = new St.Bin({
		style_class: 'panel-button',
		reactive: true,
		can_focus: true,
		x_fill: true,
		y_fill: false,
		track_hover: true
	});
	let icPrevious = new St.Icon({
		icon_name: 'media-skip-backward-symbolic',
		style_class: 'system-status-icon'
	});
	btnPrevious.set_child(icPrevious);
	btnPrevious.connect('button-press-event', Previous);

	btnStop = new St.Bin({
		style_class: 'panel-button',
		reactive: true,
		can_focus: true,
		x_fill: true,
		y_fill: false,
		track_hover: true
	});
	let icStop = new St.Icon({
		icon_name: 'media-playback-stop-symbolic',
		style_class: 'system-status-icon'
	});
	btnStop.set_child(icStop);
	btnStop.connect('button-press-event', Stop);

	btnNext = new St.Bin({
		style_class: 'panel-button',
		reactive: true,
		can_focus: true,
		x_fill: true,
		y_fill: false,
		track_hover: true
	});
	let icNext = new St.Icon({
		icon_name: 'media-skip-forward-symbolic',
		style_class: 'system-status-icon'
	});
	btnNext.set_child(icNext);
	btnNext.connect('button-press-event', Next);

	menu.insert_child_at_index(btnNext, 0);
	menu.insert_child_at_index(btnPlayPause, 0);
	menu.insert_child_at_index(btnStop, 0);
	menu.insert_child_at_index(btnPrevious, 0);
}

function enable() {
	Main.panel._rightBox.insert_child_at_index(menu, 0);
}

function disable() {
	Main.panel._rightBox.remove_child(menu);
}
